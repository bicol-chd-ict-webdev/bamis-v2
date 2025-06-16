import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import FilterPopover from '@/components/filter-popover';
import SearchInput from '@/components/search-input';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Division, type Section } from '@/types';
import { SectionFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateSection from './modals/create-section';
import DeleteSection from './modals/delete-section';
import EditSection from './modals/edit-section';

interface SectionIndexProps {
    sections: Section[];
    divisions: Division[];
}

export default function SectionIndex({ sections, divisions }: SectionIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Sections',
            href: route('administrator.sections.index'),
        },
    ];

    const formDefaults: SectionFormData = { name: '', acronym: '', code: '', division_id: '' };

    return (
        <ModalProvider<SectionFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Sections" />
                <SectionContent sections={sections} divisions={divisions} />
            </AppLayout>
        </ModalProvider>
    );
}

const SectionContent = ({ sections, divisions }: SectionIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const [selectedDivisions, setSelectedDivisions] = useState<number[]>([]);
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    const handleFilterChange = (selectedDivisionIds: number[]) => {
        setSelectedDivisions(selectedDivisionIds);
    };

    const resetFilters = () => {
        setSelectedDivisions([]);
    };

    const filteredSections = useMemo(() => {
        return sections.filter((section) => selectedDivisions.length === 0 || selectedDivisions.includes(section.division_id));
    }, [sections, selectedDivisions]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex space-x-3">
                    <SearchInput id="search" name="search" search={search} setSearch={setSearch} />
                    <FilterPopover
                        data={divisions}
                        onFilterChange={handleFilterChange}
                        selectedIds={selectedDivisions}
                        setSelectedIds={setSelectedDivisions}
                        placeholder="Division"
                        keyField="id"
                        labelField="acronym"
                        countField="sections_count"
                    />

                    {selectedDivisions.length > 0 && (
                        <Button variant="ghost" onClick={resetFilters}>
                            Reset
                            <X className="size-4" />
                        </Button>
                    )}
                </div>

                <Button type="button" onClick={() => handleOpenModal('create')}>
                    <Plus />
                    Create
                </Button>
            </div>

            <SectionTable sections={filteredSections} search={search} />

            <CreateSection openModal={modal === 'create'} closeModal={handleCloseModal} divisions={divisions} />
            <EditSection openModal={modal === 'edit'} closeModal={handleCloseModal} divisions={divisions} />
            <DeleteSection openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const SectionTable = ({ sections, search }: { sections: Section[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = useMemo(
        () => [
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
        ],
        [handleOpenModal],
    );

    const columns: ColumnDef<Section>[] = useMemo(
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
                accessorKey: 'division_name',
                header: ({ column }) => <SortableHeader column={column} label="Division" />,
                cell: ({ row }) => <p>{String(row.original?.division_name)}</p>,
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return <DataTable<Section> columns={columns} data={sections} search={search} />;
};
