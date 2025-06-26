import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type Appropriation, type BreadcrumbItem } from '@/types';
import { AppropriationFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateAppropriation from './modals/create-appropriation';
import DeleteAppropriation from './modals/delete-appropriation';
import EditAppropriation from './modals/edit-appropriation';

interface AppropriationIndexProps {
    appropriations: Appropriation[];
    search?: string;
}

export default function AppropriationIndex({ appropriations }: AppropriationIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Appropriations',
            href: route('administrator.appropriations.index'),
        },
    ];

    const formDefaults: AppropriationFormData = { name: '', acronym: '' };

    return (
        <ModalProvider<AppropriationFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Appropriations" />
                <AppropriationContent appropriations={appropriations} />
            </AppLayout>
        </ModalProvider>
    );
}

const AppropriationContent = ({ appropriations }: AppropriationIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <AppropriationTable appropriations={appropriations} search={search} />

            <CreateAppropriation openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditAppropriation openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteAppropriation openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const AppropriationTable = ({ appropriations, search }: { appropriations: Appropriation[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = [
        {
            label: 'Edit',
            action: 'edit',
            handler: (row: any) => handleOpenModal('edit', row.original),
        },
        {
            isSeparator: true,
        },
        {
            label: 'Delete',
            action: 'delete',
            handler: (row: any) => handleOpenModal('delete', row.original),
        },
    ];

    const columns: ColumnDef<Appropriation>[] = [
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
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<Appropriation> columns={columns} data={appropriations} search={search} />;
};
