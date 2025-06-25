import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PapType } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreatePapType from './modals/create-paptype';
import DeletePapType from './modals/delete-paptype';
import EditPapType from './modals/edit-paptype';

interface PapTypeIndexProps {
    papTypes: PapType[];
    search?: string;
}

export default function PapTypeIndex({ papTypes }: PapTypeIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'PAP Type',
            href: route('budget.pap-types.index'),
        },
    ];

    const formDefaults = { name: '', code: '' };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="PAP Types" />
                <PapTypeContent papTypes={papTypes} />
            </AppLayout>
        </ModalProvider>
    );
}

const PapTypeContent = ({ papTypes }: PapTypeIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <PapTypeTable papTypes={papTypes} search={search} />

            <CreatePapType openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditPapType openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeletePapType openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const PapTypeTable = ({ papTypes, search }: { papTypes: PapType[]; search: string }) => {
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

    const columns: ColumnDef<PapType>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => <SortableHeader column={column} label="Name" />,
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
    ];

    return <DataTable<PapType> columns={columns} data={papTypes} search={search} />;
};
