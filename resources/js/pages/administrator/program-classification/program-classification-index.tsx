import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { PROGRAM_CLASSIFICATION_FORM_DEFAULTS } from '@/constants/form-defaults';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ProgramClassificationProvider, useProgramClassificationContext } from '@/contexts/program-classification-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import CreateProgramClassificationModal from '@/pages/administrator/program-classification/modals/create-program-classification-modal';
import DeleteProgramClassificationModal from '@/pages/administrator/program-classification/modals/delete-program-classification-modal';
import EditProgramClassificationModal from '@/pages/administrator/program-classification/modals/edit-program-classification-modal';
import administrator from '@/routes/administrator';
import type { BreadcrumbItem, ProgramClassification } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ListEnd, PencilLine, Plus, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';

interface ProgramClassificationIndexProps {
    programClassifications: ProgramClassification[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Program Classifications',
        href: administrator.programClassifications.index().url,
    },
];

export default function ProgramClassificationIndex({ programClassifications }: ProgramClassificationIndexProps): JSX.Element {
    return (
        <ModalProvider<ProgramClassification> formDefaults={PROGRAM_CLASSIFICATION_FORM_DEFAULTS}>
            <ProgramClassificationProvider value={{ programClassifications }}>
                <AppLayout breadcrumbs={BREADCRUMBS}>
                    <Head title="Program Classifications" />
                    <ProgramClassificationContent />
                </AppLayout>
            </ProgramClassificationProvider>
        </ModalProvider>
    );
}

const ProgramClassificationContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<ProgramClassification>();
    const { search, setSearch } = useSearchContext();
    const { programClassifications } = useProgramClassificationContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={programClassifications.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <ProgramClassificationTable />
            <Modals />
        </div>
    );
};

const ProgramClassificationTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<ProgramClassification>();
    const { search } = useSearchContext();
    const { programClassifications } = useProgramClassificationContext();
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

    const columns: ColumnDef<ProgramClassification>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<ProgramClassification, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<ProgramClassification, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<ProgramClassification, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (programClassifications.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<ListEnd />}
                onAction={(): void => handleOpenModal('create')}
                title="Start classifying your programs"
                description="Define the high-level programs of your agency to begin mapping your expenditures."
            />
        );
    }

    return (
        <DataTable<ProgramClassification>
            columns={columns}
            data={programClassifications}
            search={search}
            isLoading={isLoading}
            icon={<ListEnd />}
            emptyTitle="Program Classification"
            emptyDescription="Program Classifications"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<ProgramClassification>();

    return (
        <>
            {modal === 'create' && <CreateProgramClassificationModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditProgramClassificationModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteProgramClassificationModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
