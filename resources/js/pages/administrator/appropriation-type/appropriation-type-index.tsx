import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { APPROPRIATION_TYPE_FORM_DEFAULTS } from '@/constants/form-defaults';
import { AppropriationTypeProvider, useAppropriationTypeContext } from '@/contexts/appropriation-type-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import administrator from '@/routes/administrator';
import type { AppropriationType, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ListCheck, PencilLine, Plus, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';
import CreateAppropriationTypeModal from './modals/create-appropriation-type-modal';
import DeleteAppropriationTypeModal from './modals/delete-appropriation-type-modal';
import EditAppropriationTypeModal from './modals/edit-appropriation-type-modal';

interface AppropriationTypeIndexProps {
    appropriationTypes: AppropriationType[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Appropriation Types',
        href: administrator.appropriationTypes.index().url,
    },
];

export default function AppropriationTypeIndex({ appropriationTypes }: AppropriationTypeIndexProps): JSX.Element {
    return (
        <ModalProvider<AppropriationType> formDefaults={APPROPRIATION_TYPE_FORM_DEFAULTS}>
            <AppropriationTypeProvider value={{ appropriationTypes }}>
                <AppLayout breadcrumbs={BREADCRUMBS}>
                    <Head title="Appropriation Types" />
                    <AppropriationTypeContent />
                </AppLayout>
            </AppropriationTypeProvider>
        </ModalProvider>
    );
}

const AppropriationTypeContent = (): JSX.Element => {
    const { search, setSearch } = useSearchContext();
    const { appropriationTypes } = useAppropriationTypeContext();
    const { handleOpenModal } = useModalContext<AppropriationType>();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={appropriationTypes.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <AppropriationTypeTable />
            <Modals />
        </div>
    );
};

const AppropriationTypeTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<AppropriationType>();
    const { search } = useSearchContext();
    const { appropriationTypes } = useAppropriationTypeContext();
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

    const columns: ColumnDef<AppropriationType>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<AppropriationType, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'acronym',
            header: ({ column }: HeaderContext<AppropriationType, unknown>): JSX.Element => <SortableHeader column={column} label="Acronym" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<AppropriationType, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<AppropriationType, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (appropriationTypes.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<ListCheck />}
                onAction={(): void => handleOpenModal('create')}
                title="Categorize your fund sources"
                description="Define your appropriation categories to help classify the source and validity of your agency's funds."
            />
        );
    }

    return (
        <DataTable<AppropriationType>
            columns={columns}
            data={appropriationTypes}
            search={search}
            isLoading={isLoading}
            icon={<ListCheck />}
            emptyTitle="Appropriation Type"
            emptyDescription="Appropriation Types"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<AppropriationType>();

    return (
        <>
            {modal === 'create' && <CreateAppropriationTypeModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditAppropriationTypeModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteAppropriationTypeModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
