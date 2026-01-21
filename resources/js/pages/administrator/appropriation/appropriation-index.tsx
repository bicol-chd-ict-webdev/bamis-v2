import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { APPROPRIATION_FORM_DEFAULTS } from '@/constants/form-defaults';
import { AppropriationProvider, useAppropriationContext } from '@/contexts/appropriation-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import administrator from '@/routes/administrator';
import type { Appropriation, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { GitCompare, PencilLine, Plus, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';
import CreateAppropriationModal from './modals/create-appropriation-modal';
import DeleteAppropriationModal from './modals/delete-appropriation-modal';
import EditAppropriationModal from './modals/edit-appropriation-modal';

interface AppropriationIndexProps {
    appropriations: Appropriation[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Appropriations',
        href: administrator.appropriations.index().url,
    },
];

export default function AppropriationIndex({ appropriations }: AppropriationIndexProps): JSX.Element {
    return (
        <ModalProvider<Appropriation> formDefaults={APPROPRIATION_FORM_DEFAULTS}>
            <AppropriationProvider value={{ appropriations }}>
                <AppLayout breadcrumbs={BREADCRUMBS}>
                    <Head title="Appropriations" />
                    <AppropriationContent />
                </AppLayout>
            </AppropriationProvider>
        </ModalProvider>
    );
}

const AppropriationContent = (): JSX.Element => {
    const { search, setSearch } = useSearchContext();
    const { appropriations } = useAppropriationContext();
    const { handleOpenModal } = useModalContext<Appropriation>();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={appropriations.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <AppropriationTable />
            <Modals />
        </div>
    );
};

const AppropriationTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Appropriation>();
    const { search } = useSearchContext();
    const { appropriations } = useAppropriationContext();
    const { isLoading } = useLoadingContext();

    const dropdownItems = useMemo(
        () => [
            {
                icon: <PencilLine />,
                label: 'Edit',
                action: 'edit',
                handler: (row: any): void => handleOpenModal('edit', row.original),
            },
            {
                isSeparator: true,
            },
            {
                icon: <Trash2 />,
                label: 'Delete',
                action: 'delete',
                handler: (row: any): void => handleOpenModal('delete', row.original),
            },
        ],
        [handleOpenModal],
    );

    const columns: ColumnDef<Appropriation>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<Appropriation, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'acronym',
            header: ({ column }: HeaderContext<Appropriation, unknown>): JSX.Element => <SortableHeader column={column} label="Acronym" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<Appropriation, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (appropriations.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<GitCompare />}
                onAction={(): void => handleOpenModal('create')}
                title="Appropriations list is empty"
                description="Register your fund sources and legal bases now to maintain an audit-ready trail of your agency's budget."
            />
        );
    }

    return (
        <DataTable<Appropriation>
            columns={columns}
            data={appropriations}
            search={search}
            isLoading={isLoading}
            icon={<GitCompare />}
            emptyTitle="Appropriation"
            emptyDescription="Appropriations"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Appropriation>();

    return (
        <>
            {modal === 'create' && <CreateAppropriationModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditAppropriationModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteAppropriationModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
