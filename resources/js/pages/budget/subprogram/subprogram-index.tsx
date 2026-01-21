import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { SUBPROGRAM_FORM_DEFAULTS } from '@/constants/form-defaults';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ProgramProvider } from '@/contexts/program-context';
import { useSearchContext } from '@/contexts/search-context';
import { SubprogramProvider, useSubprogramContext } from '@/contexts/subprogram-context';
import AppLayout from '@/layouts/app-layout';
import CreateSubprogramModal from '@/pages/budget/subprogram/modals/create-subprogram-modal';
import DeleteSubprogramModal from '@/pages/budget/subprogram/modals/delete-subprogram-modal';
import EditSubprogram from '@/pages/budget/subprogram/modals/edit-subprogram';
import budget from '@/routes/budget';
import type { BreadcrumbItem, Program, Subprogram } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ListCollapse, PencilLine, Plus, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';

interface SubprogramIndexProps {
    subprograms: Subprogram[];
    programs: Program[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Subprograms',
        href: budget.subprograms.index().url,
    },
];

export default function SubprogramIndex({ subprograms, programs }: SubprogramIndexProps): JSX.Element {
    return (
        <ModalProvider<Subprogram> formDefaults={SUBPROGRAM_FORM_DEFAULTS}>
            <ProgramProvider value={{ programs }}>
                <SubprogramProvider value={{ subprograms }}>
                    <AppLayout breadcrumbs={BREADCRUMBS}>
                        <Head title="Subprograms" />
                        <SubprogramContent />
                    </AppLayout>
                </SubprogramProvider>
            </ProgramProvider>
        </ModalProvider>
    );
}

const SubprogramContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Subprogram>();
    const { search, setSearch } = useSearchContext();
    const { subprograms } = useSubprogramContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={subprograms.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <SubprogramTable />
            <Modals />
        </div>
    );
};

const SubprogramTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Subprogram>();
    const { search } = useSearchContext();
    const { subprograms } = useSubprogramContext();
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

    const columns: ColumnDef<Subprogram>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<Subprogram, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<Subprogram, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            accessorKey: 'program_name',
            header: ({ column }: HeaderContext<Subprogram, unknown>): JSX.Element => <SortableHeader column={column} label="Program" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<Subprogram, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (subprograms.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<ListCollapse />}
                onAction={(): void => handleOpenModal('create')}
                title="Subprogram registry is empty"
                description="Create a subprogram to further categorize your activities and provide a more detailed breakdown of your budget."
            />
        );
    }

    return (
        <DataTable<Subprogram>
            columns={columns}
            data={subprograms}
            search={search}
            isLoading={isLoading}
            icon={<ListCollapse />}
            emptyTitle="Subprogram"
            emptyDescription="Subprograms"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Subprogram>();

    return (
        <>
            {modal === 'create' && <CreateSubprogramModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditSubprogram openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteSubprogramModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
