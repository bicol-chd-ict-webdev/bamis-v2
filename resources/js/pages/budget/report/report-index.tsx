import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import ReportQueueStatus from '@/components/statuses/report-queue-status';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import ExportReportModal from '@/pages/budget/report/modals/export-report';
import type { BreadcrumbItem, Report } from '@/types';
import { Head } from '@inertiajs/react';
import { echo } from '@laravel/echo-react';
import { ColumnDef } from '@tanstack/react-table';
import { differenceInDays } from 'date-fns';
import { BarChart2, CloudDownload, Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';

interface ReportIndexProps {
    reports: Report[];
    search?: string;
}

declare global {
    interface Window {
        processingToastId?: string | number | null;
    }
}

export default function ReportIndex({ reports }: ReportIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Reports',
            href: route('budget.reports.index'),
        },
    ];

    const now = new Date();
    const formDefaults = { type: 'saob-chd', date: now.toISOString().split('T')[0] };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Reports" />
                <ReportContent reports={reports} />
            </AppLayout>
        </ModalProvider>
    );
}

const ReportContent = ({ reports: initialReports }: ReportIndexProps) => {
    const [reports, setReports] = useState(initialReports);
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const echoInstance = useMemo(() => echo(), []);

    useEffect(() => {
        const channel = echoInstance.private('reports');

        console.log('🔌 Attempting to subscribe to private reports channel...');

        channel
            .subscribed(() => {
                console.log('✅ Successfully subscribed to reports channel!');
            })
            .error((error: any) => {
                console.error('❌ Failed to subscribe to reports channel:', error);
            })
            .listen('.report.updated', (event: any) => {
                setReports((prev) => {
                    const exists = prev.find((r) => r.id === event.id);

                    const statusChanged = exists ? exists.status !== event.status : true;

                    if (statusChanged) {
                        if (window.processingToastId) {
                            toast.dismiss(window.processingToastId);
                            window.processingToastId = null;
                        }

                        if (event.status === 'Processing') {
                            window.processingToastId = toast.loading(`Generating ${event.filename?.toLowerCase() ?? 'report'}...`, {
                                duration: Infinity,
                            });
                        } else if (event.status === 'Completed') {
                            toast.success('Report generation completed!', {
                                action: event.download_link
                                    ? {
                                          label: 'Download',
                                          onClick: () => window.open(event.download_link, '_blank'),
                                      }
                                    : undefined,
                            });
                        } else if (event.status === 'Failed') {
                            toast.error(`${event.type} report generation failed`);
                        }
                    }

                    if (exists) {
                        return prev.map((r) => (r.id === event.id ? { ...r, ...event, download_link: event.download_link } : r));
                    }
                    return [event, ...prev];
                });
            });

        return () => {
            console.log('👋 Unsubscribing from reports channel');
            echoInstance.leaveChannel('reports');
        };
    }, [echoInstance]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            {reports.length > 0 ? (
                <>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        text="Export"
                        icon={<CloudDownload />}
                        variant="outline"
                        onCreate={() => handleOpenModal('create')}
                    />
                    <ReportTable reports={reports} search={search} />
                </>
            ) : (
                <Empty className="border border-dashed">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <BarChart2 />
                        </EmptyMedia>
                        <EmptyTitle>No Reports Exported</EmptyTitle>
                        <EmptyDescription>Start generating reports to access them anytime.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button variant="outline" size="sm" onClick={() => handleOpenModal('create')}>
                            <CloudDownload />
                            Export
                        </Button>
                    </EmptyContent>
                </Empty>
            )}

            <ExportReportModal openModal={modal === 'create'} closeModal={handleCloseModal} />
        </div>
    );
};

const ReportTable = ({ reports, search }: ReportIndexProps) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = useMemo(
        () => [
            {
                icon: <Download />,
                label: 'Download',
                action: 'download',
                disabled: (row: any) => !row.original.download_link || row.original.status === 'Failed',
                handler: (row: any) => {
                    const url = row.original.download_link;
                    if (url) {
                        window.open(url, '_blank');
                    } else {
                        toast.error('Download link not yet available. Please wait for processing to complete.');
                    }
                },
            },
        ],
        [handleOpenModal],
    );

    const columns: ColumnDef<Report>[] = useMemo(
        () => [
            {
                accessorKey: 'filename',
                header: ({ column }) => <SortableHeader column={column} label="File" />,
                cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
            },
            {
                accessorKey: 'type',
                header: ({ column }) => <SortableHeader column={column} label="Type" />,
                cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
            },
            {
                accessorKey: 'status',
                header: ({ column }) => <SortableHeader column={column} label="Status" />,
                cell: ({ cell }) => <ReportQueueStatus status={String(cell.getValue())} />,
            },
            {
                accessorKey: 'expires_at',
                header: ({ column }) => <SortableHeader column={column} label="Expiry" />,
                cell: ({ row }) => {
                    const now = new Date();
                    const daysLeft: number = differenceInDays(row.original.expires_at, now);

                    return <p>{row.original.expires_at ? `${daysLeft} day${daysLeft > 1 ? 's' : ''} left` : '-/-'}</p>;
                },
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return <DataTable<Report> columns={columns} data={reports} search={search} />;
};
