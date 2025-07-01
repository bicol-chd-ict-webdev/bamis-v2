import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type LineItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateLineItem from './modals/create-line-item';
import DeleteLineItem from './modals/delete-line-items';
import EditLineItem from './modals/edit-line-items';

export default function LineItemIndex({ lineItems }: { lineItems: LineItem[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Line Items',
            href: 'budget.line-items.index',
        },
    ];

    const formDefaults = { name: '', acronym: '', code: '' };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Line Items" />
                <DivisionContent lineItems={lineItems} />
            </AppLayout>
        </ModalProvider>
    );
}

const DivisionContent = ({ lineItems }: { lineItems: LineItem[] }) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <LineItemTable lineItems={lineItems} search={search} />

            <CreateLineItem openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditLineItem openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteLineItem openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const LineItemTable = ({ lineItems, search }: { lineItems: LineItem[]; search: string }) => {
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

    const columns: ColumnDef<LineItem>[] = [
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
    ];

    return <DataTable<LineItem> columns={columns} data={lineItems} search={search} />;
};
