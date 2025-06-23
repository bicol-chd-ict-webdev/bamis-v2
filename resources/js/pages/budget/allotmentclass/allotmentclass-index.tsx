import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type AllotmentClass, type BreadcrumbItem } from '@/types';
import { AllotmentClassFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateAllotmentClass from './modals/create-allotmentclass';
import DeleteAllotmentClass from './modals/delete-allotmentclass';
import EditAllotmentClass from './modals/edit-allotmentclass';

interface AllotmentClassIndexProps {
    allotmentClasses: AllotmentClass[];
    search?: string;
}

export default function AllotmentClassIndex({ allotmentClasses }: AllotmentClassIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Allotment Classes',
            href: route('budget.allotment-classes.index'),
        },
    ];

    const formDefaults: AllotmentClassFormData = { name: '', acronym: '', code: '' };

    return (
        <ModalProvider<AllotmentClassFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Allotment Classes" />
                <AllotmentClassContent allotmentClasses={allotmentClasses} />
            </AppLayout>
        </ModalProvider>
    );
}

const AllotmentClassContent = ({ allotmentClasses }: AllotmentClassIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <AllotmentClassTable allotmentClasses={allotmentClasses} search={search} />

            <CreateAllotmentClass openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditAllotmentClass openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteAllotmentClass openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const AllotmentClassTable = ({ allotmentClasses, search }: AllotmentClassIndexProps) => {
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

    const columns: ColumnDef<AllotmentClass>[] = [
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

    return <DataTable<AllotmentClass> columns={columns} data={allotmentClasses} search={search} />;
};
