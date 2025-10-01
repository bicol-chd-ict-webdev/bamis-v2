import ActionDropdownMenu, { DropdownItem } from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import FilterPopover from '@/components/filter-popover';
import SearchInput from '@/components/search-input';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { AllocationProvider } from '@/contexts/allocation-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import {
    type Allocation,
    type AllotmentClass,
    type AppropriationSource,
    type AppropriationType,
    type BreadcrumbItem,
    type LineItem,
    type Program,
    type ProgramClassification,
    type ProjectType,
    type Subprogram,
} from '@/types';
import { type AllocationFormData } from '@/types/form-data';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink, LibraryBigIcon, PencilLine, Plus, RefreshCwIcon, Trash2, View, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateSpecialAllotment from './modals/create-special-allotment';
import DeleteSpecialAllotment from './modals/delete-special-allotment';
import EditSpecialAllotment from './modals/edit-special-allotment';
import ViewSpecialAllotment from './modals/view-special-allotment';

interface SpecialAllotmentIndexProps {
    allocations: Allocation[];
    appropriationSources: AppropriationSource[];
    lineItems: LineItem[];
    appropriationTypes: AppropriationType[];
    allotmentClasses: AllotmentClass[];
    projectTypes?: ProjectType[];
    programClassifications?: ProgramClassification[];
    programs?: Program[];
    subprograms?: Subprogram[];
    search?: string;
}

export default function SubAllotmentIndex({
    allocations,
    lineItems,
    appropriationTypes,
    allotmentClasses,
    projectTypes,
    programClassifications,
    programs,
    subprograms,
    appropriationSources,
}: SpecialAllotmentIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Special Allotments',
            href: 'budget.special-allotments.index',
        },
    ];

    const formDefaults: AllocationFormData = {
        appropriation_source: '',
        amount: '',
        date_received: new Date().toISOString().split('T')[0],
        line_item_id: 0,
        appropriation_id: 3,
        appropriation_type_id: 0,
        allotment_class_id: 0,
        project_type_id: 0,
        program_classification_id: 0,
        program_id: 0,
        subprogram_id: 0,
        remarks: '',
        saro_number: '',
    };

    return (
        <AllocationProvider
            value={{
                lineItems,
                appropriationTypes,
                allotmentClasses,
                projectTypes,
                programClassifications,
                programs,
                subprograms,
                appropriationSources,
            }}
        >
            <ModalProvider<AllocationFormData> formDefaults={formDefaults}>
                <Toaster position="bottom-center" />

                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Special Allotments" />
                    <SpecialAllotmentContent
                        allocations={allocations}
                        lineItems={lineItems}
                        appropriationTypes={appropriationTypes}
                        allotmentClasses={allotmentClasses}
                        projectTypes={projectTypes}
                        programClassifications={programClassifications}
                        programs={programs}
                        subprograms={subprograms}
                        appropriationSources={appropriationSources}
                    />
                </AppLayout>
            </ModalProvider>
        </AllocationProvider>
    );
}

const SpecialAllotmentContent = ({ allocations, allotmentClasses, appropriationTypes }: SpecialAllotmentIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const [selectedAllotmentClass, setSelectedAllotmentClass] = useState<number[]>([]);
    const [selectedAppropriationType, setSelectedAppropriationType] = useState<number[]>([]);
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    const handleFilterChange = (selectedAllotmentClassIds: number[]) => {
        setSelectedAllotmentClass(selectedAllotmentClassIds);
    };

    const handleAppropriationTypeFilterChange = (selectedAppropriationTypeIds: number[]) => {
        setSelectedAppropriationType(selectedAppropriationTypeIds);
    };

    const resetFilters = () => {
        setSelectedAllotmentClass([]);
        setSelectedAppropriationType([]);
    };

    const filteredAllocations = useMemo(() => {
        return allocations.filter((allocation) => {
            const matchesAllotmentClass =
                selectedAllotmentClass.length === 0 || selectedAllotmentClass.includes(Number(allocation.allotment_class_id));
            const matchesAppropriationType =
                selectedAppropriationType.length === 0 || selectedAppropriationType.includes(Number(allocation.appropriation_type_id));

            return matchesAllotmentClass && matchesAppropriationType;
        });
    }, [allocations, selectedAllotmentClass, selectedAppropriationType]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex w-full space-x-3">
                    <SearchInput id="search" name="search" search={search} setSearch={setSearch} />
                    <FilterPopover
                        data={allotmentClasses}
                        onFilterChange={handleFilterChange}
                        selectedIds={selectedAllotmentClass}
                        setSelectedIds={setSelectedAllotmentClass}
                        placeholder="Allotment Class"
                        keyField="id"
                        labelField="acronym"
                        countField="allocations_count"
                    />

                    <FilterPopover
                        data={appropriationTypes}
                        onFilterChange={handleAppropriationTypeFilterChange}
                        selectedIds={selectedAppropriationType}
                        setSelectedIds={setSelectedAppropriationType}
                        placeholder="Appropriation Type"
                        keyField="id"
                        labelField="acronym"
                        countField="allocations_count"
                    />

                    {(selectedAllotmentClass.length > 0 || selectedAppropriationType.length > 0) && (
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

            <SpecialAllotmentTable allocations={filteredAllocations} search={search} />

            <CreateSpecialAllotment openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditSpecialAllotment openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteSpecialAllotment openModal={modal === 'delete'} closeModal={handleCloseModal} />
            <ViewSpecialAllotment openModal={modal === 'view'} closeModal={handleCloseModal} />
        </div>
    );
};

const SpecialAllotmentTable = ({ allocations, search }: { allocations: Allocation[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const getDropdownItems = (row: any): DropdownItem[] => [
        {
            icon: <LibraryBigIcon />,
            label: 'Obligate',
            action: 'view',
            handler: (row: any) =>
                router.get(route('budget.obligations.index'), {
                    special_allotment: row.original.id,
                }),
            disabled: (row: any) => row.original.office_allotments_count < 1 || row.original.object_distributions_count < 1,
        },
        {
            isSeparator: true,
        },
        {
            icon: <ExternalLink />,
            label: 'Object Distribution',
            action: 'view',
            handler: (row: any) =>
                router.get(route('budget.object-distributions.index'), {
                    special_allotment: row.original.id,
                }),
        },
        {
            icon: <ExternalLink />,
            label: 'Office Allotment',
            action: 'view',
            handler: (row: any) =>
                router.get(route('budget.office-allotments.index'), {
                    special_allotment: row.original.id,
                }),
        },
        {
            isSeparator: true,
        },
        {
            icon: <RefreshCwIcon />,
            label: 'Generate RAO',
            action: 'view',
            handler: (row: any) => window.open(route('budget.export.rao-report', { allocation: row.original.id }))
        },
        {
            isSeparator: true,
        },
        {
            icon: <View />,
            label: 'View',
            action: 'view',
            handler: (row: any) => handleOpenModal('view', row.original),
        },
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
    ];

    const columns: ColumnDef<Allocation>[] = [
        {
            accessorKey: 'saro_number',
            header: ({ column }) => <SortableHeader column={column} label="SARO Number" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'line_item_name',
            header: ({ column }) => <SortableHeader column={column} label="Line Item" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'allotment_class_acronym',
            header: ({ column }) => <SortableHeader column={column} label="Allotment Class" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => <SortableHeader column={column} label="Allocation" />,
            cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
        },
        {
            accessorKey: 'obligations_sum_amount',
            header: ({ column }) => <SortableHeader column={column} label="Obligation" />,
            cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
        },
        {
            accessorKey: 'disbursements_sum_amount',
            header: ({ column }) => <SortableHeader column={column} label="Disbursement" />,
            cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
        },
        {
            accessorKey: 'unobligated_balance',
            header: ({ column }) => <SortableHeader column={column} label="Unobligated Balance" />,
            cell: ({ cell }) => <p className="text-destructive">{FormatMoney(Number(cell.getValue()))}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={getDropdownItems(row)} row={row} />,
        },
    ];

    return <DataTable<Allocation> columns={columns} data={allocations} search={search} />;
};
