import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import FilterPopover from '@/components/filter-popover';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { SPECIAL_ALLOTMENT_FORM_DEFAULTS } from '@/constants/form-defaults';
import { AllocationProvider, useAllocationContext } from '@/contexts/allocation-context';
import { AllotmentClassProvider, useAllotmentClassContext } from '@/contexts/allotment-class-context';
import { AppropriationTypeProvider, useAppropriationTypeContext } from '@/contexts/appropriation-type-context';
import { LineItemProvider } from '@/contexts/line-item-context';
import { LoadingProvider, useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ProgramClassificationProvider } from '@/contexts/program-classification-context';
import { ProgramProvider } from '@/contexts/program-context';
import { ProjectTypeProvider } from '@/contexts/project-type-context';
import { SearchProvider, useSearchContext } from '@/contexts/search-context';
import { SubprogramProvider } from '@/contexts/subprogram-context';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import budget from '@/routes/budget';
import type {
    Allocation,
    AllotmentClass,
    AppropriationSourceEnum,
    AppropriationType,
    BreadcrumbItem,
    LineItem,
    Program,
    ProgramClassification,
    ProjectType,
    Subprogram,
} from '@/types';
import { type AllocationFormData } from '@/types/form-data';
import { Head, router } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { PencilLine, Plus, RefreshCwIcon, Trash2, View, Wallet, X } from 'lucide-react';
import { JSX, memo, useMemo, useState } from 'react';
import CreateSpecialAllotment from './modals/create-special-allotment';
import DeleteSpecialAllotment from './modals/delete-special-allotment';
import EditSpecialAllotment from './modals/edit-special-allotment';
import ViewSpecialAllotment from './modals/view-special-allotment';

interface SpecialAllotmentIndexProps {
    allocations: Allocation[];
    appropriationSources: AppropriationSourceEnum[];
    lineItems: LineItem[];
    appropriationTypes: AppropriationType[];
    allotmentClasses: AllotmentClass[];
    projectTypes: ProjectType[];
    programClassifications: ProgramClassification[];
    programs: Program[];
    subprograms: Subprogram[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Special Allotments',
        href: budget.specialAllotments.index().url,
    },
];

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
}: SpecialAllotmentIndexProps): JSX.Element {
    return (
        <ModalProvider<AllocationFormData> formDefaults={SPECIAL_ALLOTMENT_FORM_DEFAULTS}>
            <LoadingProvider>
                <SearchProvider>
                    <AllocationProvider value={{ allocations, appropriationSources }}>
                        <LineItemProvider value={{ lineItems }}>
                            <AppropriationTypeProvider value={{ appropriationTypes }}>
                                <AllotmentClassProvider value={{ allotmentClasses }}>
                                    <ProjectTypeProvider value={{ projectTypes }}>
                                        <ProgramClassificationProvider value={{ programClassifications }}>
                                            <ProgramProvider value={{ programs }}>
                                                <SubprogramProvider value={{ subprograms }}>
                                                    <AppLayout breadcrumbs={BREADCRUMBS}>
                                                        <Head title="Special Allotments" />
                                                        <SpecialAllotmentContent />
                                                    </AppLayout>
                                                </SubprogramProvider>
                                            </ProgramProvider>
                                        </ProgramClassificationProvider>
                                    </ProjectTypeProvider>
                                </AllotmentClassProvider>
                            </AppropriationTypeProvider>
                        </LineItemProvider>
                    </AllocationProvider>
                </SearchProvider>
            </LoadingProvider>
        </ModalProvider>
    );
}

const SpecialAllotmentContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Allocation>();
    const { search, setSearch } = useSearchContext();
    const { allocations } = useAllocationContext();
    const { allotmentClasses } = useAllotmentClassContext();
    const { appropriationTypes } = useAppropriationTypeContext();
    const [selectedAllotmentClass, setSelectedAllotmentClass] = useState<(string | number)[]>([]);
    const [selectedAppropriationType, setSelectedAppropriationType] = useState<(string | number)[]>([]);

    const handleFilterChange = (selectedAllotmentClassIds: (string | number)[]): void => {
        setSelectedAllotmentClass(selectedAllotmentClassIds);
    };

    const handleAppropriationTypeFilterChange = (selectedAppropriationTypeIds: (string | number)[]): void => {
        setSelectedAppropriationType(selectedAppropriationTypeIds);
    };

    const resetFilters = () => {
        setSelectedAllotmentClass([]);
        setSelectedAppropriationType([]);
    };

    const filteredAllocations: Allocation[] = useMemo((): Allocation[] => {
        return allocations.filter((allocation: Allocation): boolean => {
            const matchesAllotmentClass: boolean =
                selectedAllotmentClass.length === 0 || selectedAllotmentClass.includes(Number(allocation.allotment_class_id));
            const matchesAppropriationType: boolean =
                selectedAppropriationType.length === 0 || selectedAppropriationType.includes(Number(allocation.appropriation_type_id));

            return matchesAllotmentClass && matchesAppropriationType;
        });
    }, [allocations, selectedAllotmentClass, selectedAppropriationType]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={allocations.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
                childrenPosition="beside-search"
            >
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
            </SearchHeader>
            <SpecialAllotmentTable filteredAllocations={filteredAllocations} />
            <Modals />
        </div>
    );
};

const SpecialAllotmentTable = ({ filteredAllocations }: { filteredAllocations: Allocation[] }): JSX.Element => {
    const { handleOpenModal } = useModalContext<Allocation>();
    const { search } = useSearchContext();
    const { isLoading } = useLoadingContext();
    const { allocations } = useAllocationContext();

    const dropdownItems = useMemo(
        () => [
            {
                icon: <RefreshCwIcon />,
                label: 'Generate RAO',
                action: 'view',
                handler: (row: any): Window | null => window.open(budget.export.raoReport({ query: { allocation: row.original.id } }).url),
            },
            {
                isSeparator: true,
            },
            {
                icon: <View />,
                label: 'View',
                action: 'view',
                handler: (row: any): void => router.get(budget.specialAllotments.show(row.original).url),
            },
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

    const columns: ColumnDef<Allocation>[] = [
        {
            accessorKey: 'line_item_name',
            header: ({ column }: HeaderContext<Allocation, unknown>): JSX.Element => <SortableHeader column={column} label="Line Item" />,
        },
        {
            accessorKey: 'allotment_class_acronym',
            header: ({ column }: HeaderContext<Allocation, unknown>): JSX.Element => <SortableHeader column={column} label="Allotment Class" />,
        },
        {
            accessorKey: 'amount',
            header: ({ column }: HeaderContext<Allocation, unknown>): JSX.Element => <SortableHeader column={column} label="Allocation" />,
            cell: ({ getValue }: CellContext<Allocation, unknown>): JSX.Element => <p>{FormatMoney(Number(getValue()))}</p>,
        },
        {
            accessorKey: 'obligations_sum_amount',
            header: ({ column }: HeaderContext<Allocation, unknown>): JSX.Element => <SortableHeader column={column} label="Obligation" />,
            cell: ({ getValue }: CellContext<Allocation, unknown>): JSX.Element => <p>{FormatMoney(Number(getValue()))}</p>,
        },
        {
            accessorKey: 'disbursements_sum_amount',
            header: ({ column }: HeaderContext<Allocation, unknown>): JSX.Element => <SortableHeader column={column} label="Disbursement" />,
            cell: ({ getValue }: CellContext<Allocation, unknown>): JSX.Element => <p>{FormatMoney(Number(getValue()))}</p>,
        },
        {
            accessorKey: 'unobligated_balance',
            header: ({ column }: HeaderContext<Allocation, unknown>): JSX.Element => <SortableHeader column={column} label="Unobligated Balance" />,
            cell: ({ getValue }: CellContext<Allocation, unknown>): JSX.Element => (
                <p className="text-destructive">{FormatMoney(Number(getValue()))}</p>
            ),
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<Allocation, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (allocations.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Wallet />}
                onAction={(): void => handleOpenModal('create')}
                title="Establish appropriation registry"
                description="Record the authorized amounts from the SARO to create a baseline for obligations and disbursements."
            />
        );
    }

    return (
        <DataTable<Allocation>
            columns={columns}
            data={filteredAllocations}
            search={search}
            isLoading={isLoading}
            icon={<Wallet />}
            emptyTitle="Allocation"
            emptyDescription="Allocations"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Allocation>();

    return (
        <>
            {modal === 'create' && <CreateSpecialAllotment openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditSpecialAllotment openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteSpecialAllotment openModal={true} closeModal={handleCloseModal} />}
            {modal === 'view' && <ViewSpecialAllotment openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
