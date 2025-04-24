import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Division } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateDivision from './modals/create-division';
import DeleteDivision from './modals/delete-division';
import EditDivision from './modals/edit-division';

export default function DivisionIndex({ divisions }: { divisions: Division[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Divisions',
            href: 'admin.divisions.index',
        },
    ];

    const formDefaults = { name: '', acronym: '' };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Divisions" />
                <DivisionContent divisions={divisions} />
            </AppLayout>
        </ModalProvider>
    );
}

const DivisionContent = ({ divisions }: { divisions: Division[] }) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <DivisionTable divisions={divisions} search={search} />

            <CreateDivision openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditDivision openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteDivision openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const DivisionTable = ({ divisions, search }: { divisions: Division[]; search: string }) => {
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

    const columns: ColumnDef<Division>[] = [
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

    return <DataTable<Division> columns={columns} data={divisions} search={search} />;
};
