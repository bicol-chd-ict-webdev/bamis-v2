import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type AllotmentClass, type BreadcrumbItem } from '@/types';
import { AllotmentClassFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { echo } from '@laravel/echo-react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateAllotmentClass from './modals/create-allotment-class';
import DeleteAllotmentClass from './modals/delete-allotment-class';
import EditAllotmentClass from './modals/edit-allotment-class';

interface AllotmentClassIndexProps {
    allotmentClasses: AllotmentClass[];
    search?: string;
}

export default function AllotmentClassIndex({ allotmentClasses }: AllotmentClassIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Allotment Classes',
            href: route('administrator.allotment-classes.index'),
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
    const [classes, setClasses] = useState<AllotmentClass[]>(allotmentClasses);
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const echoInstance = useMemo(() => echo(), []);

    useEffect(() => {
        const channel = echoInstance.private('allotment-classes');

        channel.listen('AllotmentClassDeleted', (e: { id: number }) => {
            setClasses((prev) => prev.filter((allotmentClass) => allotmentClass.id !== e.id));
        });

        return () => {
            echoInstance.leave('allotment-classes');
        };
    }, []);

    useEffect(() => {
        setClasses(allotmentClasses);
    }, [allotmentClasses]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <AllotmentClassTable allotmentClasses={classes} search={search} />

            <CreateAllotmentClass openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditAllotmentClass openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteAllotmentClass openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const AllotmentClassTable = ({ allotmentClasses, search }: AllotmentClassIndexProps) => {
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

    const columns: ColumnDef<AllotmentClass>[] = useMemo(
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

    return <DataTable<AllotmentClass> columns={columns} data={allotmentClasses} search={search} />;
};
