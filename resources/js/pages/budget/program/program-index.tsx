import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { PROGRAM_FORM_DEFAULTS } from '@/constants/form-defaults';
import { AppropriationSourceProvider } from '@/contexts/appropriation-source-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ProgramClassificationProvider } from '@/contexts/program-classification-context';
import { ProgramProvider, useProgramContext } from '@/contexts/program-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import budget from '@/routes/budget';
import type { AppropriationSourceEnum, BreadcrumbItem, Program, ProgramClassification } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Logs, PencilLine, Plus, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';
import CreateProgramModal from './modals/create-program-modal';
import DeleteProgramModal from './modals/delete-program-modal';
import EditProgramModal from './modals/edit-program-modal';

interface ProgramIndexProps {
    programs: Program[];
    appropriationSources: AppropriationSourceEnum[];
    programClassifications: ProgramClassification[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Programs',
        href: budget.programs.index().url,
    },
];

export default function ProgramIndex({ programs, appropriationSources, programClassifications }: ProgramIndexProps): JSX.Element {
    return (
        <ModalProvider<Program> formDefaults={PROGRAM_FORM_DEFAULTS}>
            <ProgramClassificationProvider value={{ programClassifications }}>
                <AppropriationSourceProvider value={{ appropriationSources }}>
                    <ProgramProvider value={{ programs }}>
                        <AppLayout breadcrumbs={BREADCRUMBS}>
                            <Head title="Programs" />
                            <ProgramContent />
                        </AppLayout>
                    </ProgramProvider>
                </AppropriationSourceProvider>
            </ProgramClassificationProvider>
        </ModalProvider>
    );
}

const ProgramContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext();
    const { search, setSearch } = useSearchContext();
    const { programs } = useProgramContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={programs.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <ProgramTable />
            <Modals />
        </div>
    );
};

const ProgramTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Program>();
    const { search } = useSearchContext();
    const { programs } = useProgramContext();
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

    const columns: ColumnDef<Program>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<Program, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'appropriation_source',
            header: ({ column }: HeaderContext<Program, unknown>): JSX.Element => <SortableHeader column={column} label="Appropriation Source" />,
        },
        {
            accessorKey: 'program_classification_name',
            header: ({ column }: HeaderContext<Program, unknown>): JSX.Element => <SortableHeader column={column} label="Program Classification" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<Program, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<Program, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (programs.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Logs />}
                onAction={(): void => handleOpenModal('create')}
                title="Program list is empty"
                description="Add your first program to start classifying your agency's strategic initiatives and budgets."
            />
        );
    }

    return (
        <DataTable<Program>
            columns={columns}
            data={programs}
            search={search}
            isLoading={isLoading}
            icon={<Logs />}
            emptyTitle="Program"
            emptyDescription="Programs"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Program>();

    return (
        <>
            {modal === 'create' && <CreateProgramModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditProgramModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteProgramModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
