import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import FilterPopover from '@/components/filter-popover';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { EXPENDITURE_FORM_DEFAULTS } from '@/constants/form-defaults';
import { AllotmentClassProvider, useAllotmentClassContext } from '@/contexts/allotment-class-context';
import { ExpenditureProvider, useExpenditureContext } from '@/contexts/expenditure-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import budget from '@/routes/budget';
import type { AllotmentClass, BreadcrumbItem, Expenditure } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { HandCoins, PencilLine, Plus, Trash2, X } from 'lucide-react';
import { JSX, memo, useMemo, useState } from 'react';
import CreateExpenditureModal from './modals/create-expenditure-modal';
import DeleteExpenditureModal from './modals/delete-expenditure-modal';
import EditExpenditureModal from './modals/edit-expenditure-modal';

interface ExpenditureIndexProps {
    expenditures: Expenditure[];
    allotmentClasses: AllotmentClass[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Expenditures',
        href: budget.expenditures.index().url,
    },
];

export default function ExpenditureIndex({ expenditures, allotmentClasses }: ExpenditureIndexProps): JSX.Element {
    return (
        <ModalProvider<Expenditure> formDefaults={EXPENDITURE_FORM_DEFAULTS}>
            <ExpenditureProvider value={{ expenditures }}>
                <AllotmentClassProvider value={{ allotmentClasses }}>
                    <AppLayout breadcrumbs={BREADCRUMBS}>
                        <Head title="Expenditures" />
                        <ExpenditureContent />
                    </AppLayout>
                </AllotmentClassProvider>
            </ExpenditureProvider>
        </ModalProvider>
    );
}

const ExpenditureContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Expenditure>();
    const { search, setSearch } = useSearchContext();
    const { expenditures } = useExpenditureContext();
    const { allotmentClasses } = useAllotmentClassContext();
    const [selectedAllotmentClass, setSelectedAllotmentClass] = useState<(string | number)[]>([]);

    const handleFilterChange = (selectedAllotmentClassIds: (string | number)[]): void => {
        setSelectedAllotmentClass(selectedAllotmentClassIds);
    };

    const resetFilters = (): void => {
        setSelectedAllotmentClass([]);
    };

    const filteredExpenditures: Expenditure[] = useMemo((): Expenditure[] => {
        return expenditures.filter(
            (expenditure: Expenditure): boolean =>
                selectedAllotmentClass.length === 0 || selectedAllotmentClass.includes(expenditure.allotment_class_id),
        );
    }, [expenditures, selectedAllotmentClass]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={expenditures.length > 0}
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
                    countField="expenditures_count"
                />

                {selectedAllotmentClass.length > 0 && (
                    <Button variant="ghost" onClick={resetFilters}>
                        Reset
                        <X className="size-4" />
                    </Button>
                )}
            </SearchHeader>
            <ExpenditureTable filteredExpenditures={filteredExpenditures} />
            <Modals />
        </div>
    );
};

const ExpenditureTable = ({ filteredExpenditures }: { filteredExpenditures: Expenditure[] }): JSX.Element => {
    const { handleOpenModal } = useModalContext<Expenditure>();
    const { expenditures } = useExpenditureContext();
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

    const columns: ColumnDef<Expenditure>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<Expenditure, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<Expenditure, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            accessorKey: 'allotment_class_name',
            header: ({ column }: HeaderContext<Expenditure, unknown>): JSX.Element => <SortableHeader column={column} label="Allotment Class" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<Expenditure, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (expenditures.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<HandCoins />}
                onAction={(): void => handleOpenModal('create')}
                title="Categorize your spending"
                description="Define your expenditure objects and their corresponding UACS codes to ensure all transactions are categorized."
            />
        );
    }

    return (
        <DataTable<Expenditure>
            columns={columns}
            data={filteredExpenditures}
            search={search}
            isLoading={isLoading}
            icon={<HandCoins />}
            emptyTitle="Expenditure"
            emptyDescription="Expenditures"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Expenditure>();

    return (
        <>
            {modal === 'create' && <CreateExpenditureModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditExpenditureModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteExpenditureModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
