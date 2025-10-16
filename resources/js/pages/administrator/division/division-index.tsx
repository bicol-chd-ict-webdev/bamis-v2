import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Division } from '@/types';
import { type DivisionFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateDivision from './modals/create-division';
import DeleteDivision from './modals/delete-division';
import EditDivision from './modals/edit-division';

interface DivisionIndexProps {
    divisions: Division[];
    search?: string;
}

export default function DivisionIndex({ divisions }: DivisionIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Divisions',
            href: route('administrator.divisions.index'),
        },
    ];

    const formDefaults: DivisionFormData = { name: '', acronym: '' };

    return (
        <ModalProvider<DivisionFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Divisions" />
                <DivisionContent divisions={divisions} />
            </AppLayout>
        </ModalProvider>
    );
}

const DivisionContent = ({ divisions }: DivisionIndexProps) => {
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

const DivisionTable = ({ divisions, search }: DivisionIndexProps) => {
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

    const columns: ColumnDef<Division>[] = useMemo(
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
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return <DataTable<Division> columns={columns} data={divisions} search={search} />;
};
