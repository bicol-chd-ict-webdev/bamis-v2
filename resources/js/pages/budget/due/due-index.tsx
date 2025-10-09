import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import CreateDue from '@/pages/budget/due/modals/create-due';
import DeleteDue from '@/pages/budget/due/modals/delete-due';
import EditDue from '@/pages/budget/due/modals/edit-due';
import { type BreadcrumbItem, type Due } from '@/types';
import { type DueFormData } from '@/types/form-data';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { CalendarCheck, PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';

interface DueIndexProps {
    dues: Due[];
    search?: string;
}

export default function DueIndex({ dues }: DueIndexProps) {
    const allocationParam = useAllocationParam();

    if (!allocationParam) {
        return <p className="text-red-600">No valid allocation query param provided.</p>;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: allocationParam.title,
            href: route(allocationParam.indexRoute),
        },
        {
            title: 'Obligations',
            href: route('budget.obligations.index', { [allocationParam.key]: allocationParam.id }),
        },
        {
            title: 'Due and Demandables',
            href: '',
        },
    ];

    const { url } = usePage();
    const obligationId = url.match(/\/budget\/obligations\/(\d+)/)?.[1];

    const formDefaults: DueFormData = {
        amount: '',
        obligation_id: Number(obligationId),
    };

    return (
        <ModalProvider<DueFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Due and Demandables" />

                <DueContent dues={dues} />
            </AppLayout>
        </ModalProvider>
    );
}

const DueContent = ({ dues }: DueIndexProps) => {
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const [search, setSearch] = useState<string>('');

    return (
        <div className="flex h-full flex-1 flex-col gap-4 p-4">
            {dues.length < 1 ? (
                <div className="border-border flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center text-sm">
                    <CalendarCheck className="mb-2 size-12" strokeWidth={1} />
                    <h2 className="my-1 text-base font-semibold">No due and demandables yet</h2>
                    <p className="text-muted-foreground mb-6">
                        Start by processing financial obligations to initiate the due and demandables workflow.
                    </p>
                    <Button type="button" onClick={() => handleOpenModal('create')}>
                        <CalendarCheck />
                        <span>Create Due</span>
                    </Button>
                </div>
            ) : (
                <>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        onCreate={() => handleOpenModal('create')}
                        icon={<CalendarCheck />}
                        text="Create Due"
                    />
                    <DueTable dues={dues} search={search} />
                </>
            )}

            <CreateDue openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditDue openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteDue openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const DueTable = ({ dues, search }: { dues: Due[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = useMemo(
        () => [
            {
                icon: <PencilLine />,
                label: 'Edit',
                action: 'edit',
                handler: (row: any) => handleOpenModal('edit', row.original),
            },
            {
                isSeparator: true,
            },
            {
                icon: <Trash2 />,
                label: 'Delete',
                action: 'delete',
                handler: (row: any) => handleOpenModal('delete', row.original),
            },
        ],
        [handleOpenModal],
    );

    const columns: ColumnDef<Due>[] = useMemo(
        () => [
            {
                accessorKey: 'amount',
                header: ({ column }) => <SortableHeader column={column} label="Amount Due" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return <DataTable<Due> columns={columns} data={dues} search={search} />;
};
