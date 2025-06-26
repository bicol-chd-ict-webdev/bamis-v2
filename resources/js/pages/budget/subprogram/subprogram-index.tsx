import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Program, type Subprogram } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateSubprogram from './modals/create-subprogram';
import DeleteSubprogram from './modals/delete-subprogram';
import EditSubprogram from './modals/edit-subprogram';

interface SubprogramIndexProps {
    subprograms: Subprogram[];
    programs: Program[];
    search?: string;
}

export default function SubprogramIndex({ subprograms, programs }: SubprogramIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Subprograms',
            href: route('budget.subprograms.index'),
        },
    ];

    const formDefaults = { name: '', program_id: '' };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Subprograms" />
                <SubprogramContent subprograms={subprograms} programs={programs} />
            </AppLayout>
        </ModalProvider>
    );
}

const SubprogramContent = ({ subprograms, programs }: SubprogramIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <SubprogramTable subprograms={subprograms} search={search} />

            <CreateSubprogram openModal={modal === 'create'} closeModal={handleCloseModal} programs={programs} />
            <EditSubprogram openModal={modal === 'edit'} closeModal={handleCloseModal} programs={programs} />
            <DeleteSubprogram openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const SubprogramTable = ({ subprograms, search }: { subprograms: Subprogram[]; search: string }) => {
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

    const columns: ColumnDef<Subprogram>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => <SortableHeader column={column} label="Name" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'program_name',
            header: ({ column }) => <SortableHeader column={column} label="Program" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<Subprogram> columns={columns} data={subprograms} search={search} />;
};
