import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import FilterPopover from '@/components/filter-popover';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { SECTION_FORM_DEFAULTS } from '@/constants/form-defaults';
import { DivisionProvider, useDivisionContext } from '@/contexts/division-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import { SectionProvider, useSectionContext } from '@/contexts/section-context';
import AppLayout from '@/layouts/app-layout';
import administrator from '@/routes/administrator';
import type { BreadcrumbItem, Division, Section } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { PencilLine, Plus, Trash2, Vault, X } from 'lucide-react';
import { JSX, memo, useMemo, useState } from 'react';
import CreateSectionModal from './modals/create-section-modal';
import DeleteSectionSection from './modals/delete-section-section';
import EditSectionModal from './modals/edit-section-modal';

interface SectionIndexProps {
    sections: Section[];
    divisions: Division[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Sections',
        href: administrator.sections.index().url,
    },
];

export default function SectionIndex({ sections, divisions }: SectionIndexProps): JSX.Element {
    return (
        <ModalProvider<Section> formDefaults={SECTION_FORM_DEFAULTS}>
            <SectionProvider value={{ sections }}>
                <DivisionProvider value={{ divisions }}>
                    <AppLayout breadcrumbs={BREADCRUMBS}>
                        <Head title="Sections" />
                        <SectionContent />
                    </AppLayout>
                </DivisionProvider>
            </SectionProvider>
        </ModalProvider>
    );
}

const SectionContent = (): JSX.Element => {
    const [selectedDivisions, setSelectedDivisions] = useState<(string | number)[]>([]);
    const { handleOpenModal } = useModalContext<Section>();
    const { sections } = useSectionContext();
    const { divisions } = useDivisionContext();
    const { search, setSearch } = useSearchContext();

    const handleFilterChange = (selectedIds: (string | number)[]): void => {
        setSelectedDivisions(selectedIds);
    };

    const resetFilters = (): void => {
        setSelectedDivisions([]);
    };

    const filteredSections: Section[] = useMemo((): Section[] => {
        return sections.filter((section: Section): boolean => selectedDivisions.length === 0 || selectedDivisions.includes(section.division_id));
    }, [sections, selectedDivisions]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={sections.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
                childrenPosition="beside-search"
            >
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
            </SearchHeader>
            <SectionTable filteredSections={filteredSections} />
            <Modals />
        </div>
    );
};

const SectionTable = ({ filteredSections }: { filteredSections: Section[] }): JSX.Element => {
    const { handleOpenModal } = useModalContext<Section>();
    const { sections } = useSectionContext();
    const { search } = useSearchContext();
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

    const columns: ColumnDef<Section>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<Section, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'acronym',
            header: ({ column }: HeaderContext<Section, unknown>): JSX.Element => <SortableHeader column={column} label="Acronym" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<Section, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            accessorKey: 'division_name',
            header: ({ column }: HeaderContext<Section, unknown>): JSX.Element => <SortableHeader column={column} label="Section" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<Section, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (sections.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Vault />}
                onAction={(): void => handleOpenModal('create')}
                title="Start your hierarchy"
                description="There are no sections here. Create a section to categorize this division’s operations."
            />
        );
    }

    return (
        <DataTable<Section>
            columns={columns}
            data={filteredSections}
            search={search}
            isLoading={isLoading}
            icon={<Vault />}
            emptyTitle="Section"
            emptyDescription="Sections"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Section>();

    return (
        <>
            {modal === 'create' && <CreateSectionModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditSectionModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteSectionSection openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
