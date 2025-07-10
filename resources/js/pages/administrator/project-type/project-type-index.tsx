import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ProjectType } from '@/types';
import { ProjectTypeFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateProjectType from './modals/create-project-type';
import DeleteProjectType from './modals/delete-project-type';
import EditProjectType from './modals/edit-project-type';

interface ProjectTypeIndexProps {
    projectTypes: ProjectType[];
    search?: string;
}

export default function ProjectTypeIndex({ projectTypes }: ProjectTypeIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Project Type',
            href: route('administrator.project-types.index'),
        },
    ];

    const formDefaults: ProjectTypeFormData = { name: '', code: 0 };

    return (
        <ModalProvider<ProjectTypeFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Project Types" />
                <ProjectTypeContent projectTypes={projectTypes} />
            </AppLayout>
        </ModalProvider>
    );
}

const ProjectTypeContent = ({ projectTypes }: ProjectTypeIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <ProjectTypeTable projectTypes={projectTypes} search={search} />

            <CreateProjectType openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditProjectType openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteProjectType openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const ProjectTypeTable = ({ projectTypes, search }: { projectTypes: ProjectType[]; search: string }) => {
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

    const columns: ColumnDef<ProjectType>[] = useMemo(
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

    return <DataTable<ProjectType> columns={columns} data={projectTypes} search={search} />;
};
