import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Program } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateProgram from './modals/create-program';
import DeleteProgram from './modals/delete-program';
import EditProgram from './modals/edit-program';

interface ProgramIndexProps {
    programs: Program[];
    appropriationSources: [];
    prexcs: [];
    search?: string;
}

export default function ProgramIndex({ programs, appropriationSources, prexcs }: ProgramIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Programs',
            href: route('budget.programs.index'),
        },
    ];

    const formDefaults = { name: '', appropriation_source: '', prexc: '', code: '' };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Programs" />
                <ProgramContent programs={programs} appropriationSources={appropriationSources} prexcs={prexcs} />
            </AppLayout>
        </ModalProvider>
    );
}

const ProgramContent = ({ programs, appropriationSources, prexcs }: ProgramIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <ProgramTable programs={programs} search={search} />

            <CreateProgram openModal={modal === 'create'} closeModal={handleCloseModal} appropriationSources={appropriationSources} prexcs={prexcs} />
            <EditProgram openModal={modal === 'edit'} closeModal={handleCloseModal} appropriationSources={appropriationSources} prexcs={prexcs} />
            <DeleteProgram openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const ProgramTable = ({ programs, search }: { programs: Program[]; search: string }) => {
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

    const columns: ColumnDef<Program>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => <SortableHeader column={column} label="Name" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'appropriation_source',
            header: ({ column }) => <SortableHeader column={column} label="Appropriation Source" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'prexc',
            header: ({ column }) => <SortableHeader column={column} label="Prexc" />,
            cell: ({ cell }) => <p>{cell.getValue() ? String(cell.getValue()) : '-/-'}</p>,
        },
        {
            accessorKey: 'code',
            header: ({ column }) => <SortableHeader column={column} label="Code" />,
            cell: ({ cell }) => <p>{cell.getValue() ? String(cell.getValue()) : '-/-'}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<Program> columns={columns} data={programs} search={search} />;
};
