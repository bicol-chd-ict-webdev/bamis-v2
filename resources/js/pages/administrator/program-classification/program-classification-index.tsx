import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ProgramClassification } from '@/types';
import { ProgramClassificationFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateProgramClassification from './modals/create-program-classification';
import DeleteProgramClassification from './modals/delete-program-classification';
import EditProgramClassification from './modals/edit-program-classification';

interface ProgramClassificationIndexProps {
    programClassifications: ProgramClassification[];
    search?: string;
}

export default function ProgramClassificationIndex({ programClassifications }: ProgramClassificationIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Program Classifications',
            href: route('administrator.program-classifications.index'),
        },
    ];

    const formDefaults: ProgramClassificationFormData = { name: '', code: 0 };

    return (
        <ModalProvider<ProgramClassificationFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Program Classifications" />
                <ProgramClassificationContent programClassifications={programClassifications} />
            </AppLayout>
        </ModalProvider>
    );
}

const ProgramClassificationContent = ({ programClassifications }: ProgramClassificationIndexProps) => {
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const [search, setSearch] = useState<string>('');

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <ProgramClassificationTable programClassifications={programClassifications} search={search} />

            <CreateProgramClassification openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditProgramClassification openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteProgramClassification openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const ProgramClassificationTable = ({ programClassifications, search }: ProgramClassificationIndexProps) => {
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

    const columns: ColumnDef<ProgramClassification>[] = useMemo(
        () => [
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
        ],
        [dropdownItems],
    );

    return <DataTable<ProgramClassification> columns={columns} data={programClassifications} search={search} />;
};
