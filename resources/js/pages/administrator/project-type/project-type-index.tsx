import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { PROJECT_TYPE_FORM_DEFAULTS } from '@/constants/form-defaults';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ProjectTypeProvider, useProjectTypeContext } from '@/contexts/project-type-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import administrator from '@/routes/administrator';
import type { BreadcrumbItem, ProjectType } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Component, PencilLine, Plus, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';
import CreateProjectTypeModal from './modals/create-project-type-modal';
import DeleteProjectTypeModal from './modals/delete-project-type-modal';
import EditProjectTypeModal from './modals/edit-project-type-modal';

interface ProjectTypeIndexProps {
    projectTypes: ProjectType[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Project Type',
        href: administrator.projectTypes.index().url,
    },
];

export default function ProjectTypeIndex({ projectTypes }: ProjectTypeIndexProps): JSX.Element {
    return (
        <ModalProvider<ProjectType> formDefaults={PROJECT_TYPE_FORM_DEFAULTS}>
            <ProjectTypeProvider value={{ projectTypes }}>
                <AppLayout breadcrumbs={BREADCRUMBS}>
                    <Head title="Project Types" />
                    <ProjectTypeContent />
                </AppLayout>
            </ProjectTypeProvider>
        </ModalProvider>
    );
}

const ProjectTypeContent = (): JSX.Element => {
    const { search, setSearch } = useSearchContext();
    const { projectTypes } = useProjectTypeContext();
    const { handleOpenModal } = useModalContext<ProjectType>();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={projectTypes.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <ProjectTypeTable />
            <Modals />
        </div>
    );
};

const ProjectTypeTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<ProjectType>();
    const { search } = useSearchContext();
    const { projectTypes } = useProjectTypeContext();
    const { isLoading } = useLoadingContext();

    const dropdownItems = useMemo(
        () => [
            {
                icon: <PencilLine />,
                label: 'Edit',
                action: 'edit',
                handler: (row: any): void => handleOpenModal('edit', row.original),
            },
            {
                isSeparator: true,
            },
            {
                icon: <Trash2 />,
                label: 'Delete',
                action: 'delete',
                handler: (row: any): void => handleOpenModal('delete', row.original),
            },
        ],
        [handleOpenModal],
    );

    const columns: ColumnDef<ProjectType>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<ProjectType, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<ProjectType, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<ProjectType, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (projectTypes.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Component />}
                onAction={(): void => handleOpenModal('create')}
                title="Awaiting project definitions"
                description="Add your first project type to begin classifying your organization's work and tracking progress."
            />
        );
    }

    return (
        <DataTable<ProjectType>
            columns={columns}
            data={projectTypes}
            search={search}
            isLoading={isLoading}
            icon={<Component />}
            emptyTitle="Project Type"
            emptyDescription="Project Types"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<ProjectType>();

    return (
        <>
            {modal === 'create' && <CreateProjectTypeModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditProjectTypeModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteProjectTypeModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
