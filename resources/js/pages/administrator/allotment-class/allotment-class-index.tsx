import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { ALLOTMENT_CLASS_FORM_DEFAULTS } from '@/constants/form-defaults';
import { AllotmentClassProvider, useAllotmentClassContext } from '@/contexts/allotment-class-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import administrator from '@/routes/administrator';
import type { AllotmentClass, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { PencilLine, Plus, Shapes, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';
import CreateAllotmentClassModal from './modals/create-allotment-class-modal';
import DeleteAllotmentClassModal from './modals/delete-allotment-class-modal';
import EditAllotmentClassModal from './modals/edit-allotment-class-modal';

interface AllotmentClassIndexProps {
    allotmentClasses: AllotmentClass[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Allotment Classes',
        href: administrator.allotmentClasses.index().url,
    },
];

export default function AllotmentClassIndex({ allotmentClasses }: AllotmentClassIndexProps): JSX.Element {
    return (
        <ModalProvider<AllotmentClass> formDefaults={ALLOTMENT_CLASS_FORM_DEFAULTS}>
            <AllotmentClassProvider value={{ allotmentClasses }}>
                <AppLayout breadcrumbs={BREADCRUMBS}>
                    <Head title="Allotment Classes" />
                    <AllotmentClassContent />
                </AppLayout>
            </AllotmentClassProvider>
        </ModalProvider>
    );
}

const AllotmentClassContent = (): JSX.Element => {
    const { allotmentClasses } = useAllotmentClassContext();
    const { search, setSearch } = useSearchContext();
    const { handleOpenModal } = useModalContext<AllotmentClass>();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={allotmentClasses.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <AllotmentClassTable />
            <Modals />
        </div>
    );
};

const AllotmentClassTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<AllotmentClass>();
    const { search } = useSearchContext();
    const { allotmentClasses } = useAllotmentClassContext();
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

    const columns: ColumnDef<AllotmentClass>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<AllotmentClass, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'acronym',
            header: ({ column }: HeaderContext<AllotmentClass, unknown>): JSX.Element => <SortableHeader column={column} label="Acronym" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<AllotmentClass, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<AllotmentClass, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (allotmentClasses.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Shapes />}
                onAction={(): void => handleOpenModal('create')}
                title="Categorize your expenditures"
                description="Define your allotment classes to begin tracking budgetary allocations according to DBM standards."
            />
        );
    }

    return (
        <DataTable<AllotmentClass>
            columns={columns}
            data={allotmentClasses}
            search={search}
            isLoading={isLoading}
            icon={<Shapes />}
            emptyTitle="Allotment Class"
            emptyDescription="Allotment Classes"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<AllotmentClass>();

    return (
        <>
            {modal === 'create' && <CreateAllotmentClassModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditAllotmentClassModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteAllotmentClassModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
