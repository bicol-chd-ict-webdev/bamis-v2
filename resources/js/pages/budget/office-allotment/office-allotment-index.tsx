import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { SectionProvider } from '@/contexts/section-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import { type BreadcrumbItem, type OfficeAllotment, type Section } from '@/types';
import { type OfficeAllotmentFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateOfficeAllotment from './modals/create-office-allotment';
import DeleteOfficeAllotment from './modals/delete-office-allotment';
import EditOfficeAllotment from './modals/edit-office-allotment';

interface OfficeAllotmentIndexProps {
    officeAllotments: OfficeAllotment[];
    sections: Section[];
    search?: string;
}

export default function OfficeAllotmentIndex({ officeAllotments, sections }: OfficeAllotmentIndexProps) {
    const allocation = useAllocationParam();

    if (!allocation) {
        return <p className="text-red-600">No valid allocation query param provided.</p>;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: allocation.title,
            href: route(allocation.indexRoute),
        },
        {
            title: 'Office Allotments',
            href: route('budget.office-allotments.index'),
        },
    ];

    const formDefaults: OfficeAllotmentFormData = { allocation_id: allocation.id, section_id: '', amount: '' };

    return (
        <SectionProvider value={{ sections }}>
            <ModalProvider<OfficeAllotmentFormData> formDefaults={formDefaults}>
                <Toaster position="bottom-center" />

                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Office Allotments" />
                    <OfficeAllotmentContent officeAllotments={officeAllotments} sections={sections} />
                </AppLayout>
            </ModalProvider>
        </SectionProvider>
    );
}

const OfficeAllotmentContent = ({ officeAllotments }: OfficeAllotmentIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <OfficeAllotmentTable officeAllotments={officeAllotments} search={search} />

            <CreateOfficeAllotment openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditOfficeAllotment openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteOfficeAllotment openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const OfficeAllotmentTable = ({ officeAllotments, search }: { officeAllotments: OfficeAllotment[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = [
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
    ];

    const columns: ColumnDef<OfficeAllotment>[] = [
        {
            accessorKey: 'section_name',
            header: ({ column }) => <SortableHeader column={column} label="Section" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => <SortableHeader column={column} label="Amount" />,
            cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<OfficeAllotment> columns={columns} data={officeAllotments} search={search} />;
};
