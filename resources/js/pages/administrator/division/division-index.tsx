import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { DIVISION_FORM_DEFAULTS } from '@/constants/form-defaults';
import { DivisionProvider, useDivisionContext } from '@/contexts/division-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/administrator/divisions';
import type { BreadcrumbItem, Division } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { PencilLine, Plus, Split, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';
import CreateDivisionModal from './modals/create-division-modal';
import DeleteDivisionModal from './modals/delete-division-modal';
import EditDivisionModal from './modals/edit-division-modal';

interface DivisionIndexProps {
    divisions: Division[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Divisions',
        href: index().url,
    },
];

export default function DivisionIndex({ divisions }: DivisionIndexProps): JSX.Element {
    return (
        <ModalProvider<Division> formDefaults={DIVISION_FORM_DEFAULTS}>
            <DivisionProvider value={{ divisions }}>
                <AppLayout breadcrumbs={BREADCRUMBS}>
                    <Head title="Divisions" />
                    <DivisionContent />
                </AppLayout>
            </DivisionProvider>
        </ModalProvider>
    );
}

const DivisionContent = (): JSX.Element => {
    const { divisions } = useDivisionContext();
    const { search, setSearch } = useSearchContext();
    const { handleOpenModal } = useModalContext<Division>();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={divisions.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <DivisionTable />
            <Modals />
        </div>
    );
};

const DivisionTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Division>();
    const { search } = useSearchContext();
    const { divisions } = useDivisionContext();
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

    const columns: ColumnDef<Division>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<Division, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'acronym',
            header: ({ column }: HeaderContext<Division, unknown>): JSX.Element => <SortableHeader column={column} label="Acronym" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<Division, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (divisions.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Split />}
                onAction={(): void => handleOpenModal('create')}
                title="Start organizing"
                description="No office divisions have been created. Add one now to manage your organizational workflows."
            />
        );
    }

    return (
        <DataTable<Division>
            columns={columns}
            data={divisions}
            search={search}
            isLoading={isLoading}
            icon={<Split />}
            emptyTitle="Division"
            emptyDescription="Divisions"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Division>();

    return (
        <>
            {modal === 'create' && <CreateDivisionModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditDivisionModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteDivisionModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
