import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { SubprogramProvider } from '@/contexts/subprogram-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Program, type Subprogram } from '@/types';
import { SubprogramFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { echo } from '@laravel/echo-react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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

    const formDefaults: SubprogramFormData = { name: '', program_id: 0 };

    return (
        <SubprogramProvider value={{ programs }}>
            <ModalProvider<SubprogramFormData> formDefaults={formDefaults}>
                <Toaster position="bottom-center" />

                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Subprograms" />
                    <SubprogramContent subprograms={subprograms} programs={programs} />
                </AppLayout>
            </ModalProvider>
        </SubprogramProvider>
    );
}

const SubprogramContent = ({ subprograms }: SubprogramIndexProps) => {
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const [search, setSearch] = useState<string>('');
    const [localSubprograms, setLocalSubprograms] = useState<Subprogram[]>(subprograms);
    const echoInstance = useMemo(() => echo(), []);

    useEffect(() => {
        const programChannel = echoInstance.private('programs');
        const subprogramChannel = echoInstance.private('subprograms');

        programChannel.listen('ProgramDeleted', (e: { id: number }) => {
            setLocalSubprograms((prev) => prev.filter((subprogram) => subprogram.program_id !== e.id));
        });

        subprogramChannel.listen('SubprogramDeleted', (e: { id: number }) => {
            setLocalSubprograms((prev) => prev.filter((subprogram) => subprogram.id !== e.id));
        });

        return () => {
            echoInstance.leave('programs');
            echoInstance.leave('subprograms');
        };
    }, [echoInstance]);

    useEffect(() => {
        setLocalSubprograms(subprograms);
    }, [subprograms]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <SubprogramTable subprograms={localSubprograms} search={search} />

            <CreateSubprogram openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditSubprogram openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteSubprogram openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const SubprogramTable = ({ subprograms, search }: { subprograms: Subprogram[]; search: string }) => {
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

    const columns: ColumnDef<Subprogram>[] = useMemo(
        () => [
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
        ],
        [dropdownItems],
    );

    return <DataTable<Subprogram> columns={columns} data={subprograms} search={search} />;
};
