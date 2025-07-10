import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type AppropriationType, type BreadcrumbItem } from '@/types';
import { AppropriationTypeFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateAppropriationType from './modals/create-appropriation-type';
import DeleteAppropriationType from './modals/delete-appropriation-type';
import EditAppropriationType from './modals/edit-appropriation-type';

interface AppropriationTypeIndexProps {
    appropriationTypes: AppropriationType[];
    search?: string;
}

export default function AppropriationTypeIndex({ appropriationTypes }: AppropriationTypeIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Appropriation Types',
            href: route('administrator.appropriation-types.index'),
        },
    ];

    const formDefaults: AppropriationTypeFormData = { name: '', acronym: '', code: 0 };

    return (
        <ModalProvider<AppropriationTypeFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Appropriation Types" />
                <AppropriationTypeContent appropriationTypes={appropriationTypes} />
            </AppLayout>
        </ModalProvider>
    );
}

const AppropriationTypeContent = ({ appropriationTypes }: AppropriationTypeIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <AppropriationTypeTable appropriationTypes={appropriationTypes} search={search} />

            <CreateAppropriationType openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditAppropriationType openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteAppropriationType openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const AppropriationTypeTable = ({ appropriationTypes, search }: { appropriationTypes: AppropriationType[]; search: string }) => {
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

    const columns: ColumnDef<AppropriationType>[] = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: ({ column }) => <SortableHeader column={column} label="Name" />,
                cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
            },
            {
                accessorKey: 'acronym',
                header: ({ column }) => <SortableHeader column={column} label="Acronym" />,
                cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
            },
            {
                accessorKey: 'code',
                header: ({ column }) => <SortableHeader column={column} label="Code" />,
                cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return <DataTable<AppropriationType> columns={columns} data={appropriationTypes} search={search} />;
};
