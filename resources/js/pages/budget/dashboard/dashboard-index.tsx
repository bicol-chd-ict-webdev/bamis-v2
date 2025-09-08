import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CloudDownload } from 'lucide-react';
import ExportReportModal from './partials/export-report';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const now = new Date();
    const formDefaults = { month: now.toLocaleString('default', { month: 'long' }), year: String(now.getFullYear()), type: 'saob' };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <ExportReport />

                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </AppLayout>
        </ModalProvider>
    );
}

const ExportReport = () => {
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="self-end">
            <Button variant="outline" onClick={() => handleOpenModal('create')}>
                <CloudDownload />
                <span>Export</span>
            </Button>

            <ExportReportModal openModal={modal === 'create'} closeModal={handleCloseModal} />
        </div>
    );
};
