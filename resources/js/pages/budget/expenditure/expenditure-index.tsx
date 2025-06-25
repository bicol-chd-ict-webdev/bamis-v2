import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import FilterPopover from '@/components/filter-popover';
import SearchInput from '@/components/search-input';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { AllotmentClass, type BreadcrumbItem, type Expenditure } from '@/types';
import { ExpenditureFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { echo } from '@laravel/echo-react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateExpenditure from './modals/create-expenditure';
import DeleteExpenditure from './modals/delete-expenditure';
import EditExpenditure from './modals/edit-expenditure';

interface ExpenditureIndexProps {
    expenditures: Expenditure[];
    allotmentClasses: AllotmentClass[];
    search?: string;
}

export default function ExpenditureIndex({ expenditures, allotmentClasses }: ExpenditureIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Expenditures',
            href: route('budget.expenditures.index'),
        },
    ];

    const formDefaults: ExpenditureFormData = { name: '', code: '', allotment_class_id: '' };

    return (
        <ModalProvider<ExpenditureFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Expenditures" />
                <ExpenditureContent expenditures={expenditures} allotmentClasses={allotmentClasses} />
            </AppLayout>
        </ModalProvider>
    );
}

const ExpenditureContent = ({ expenditures, allotmentClasses }: ExpenditureIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const [selectedAllotmentClass, setSelectedAllotmentClass] = useState<number[]>([]);
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const [localExpenditures, setLocalExpenditures] = useState<Expenditure[]>(expenditures);
    const echoInstance = useMemo(() => echo(), []);

    const handleFilterChange = (selectedAllotmentClassIds: number[]) => {
        setSelectedAllotmentClass(selectedAllotmentClassIds);
    };

    const resetFilters = () => {
        setSelectedAllotmentClass([]);
    };

    useEffect(() => {
        const classChannel = echoInstance.private('allotment-classes');
        const expenditureChannel = echoInstance.private('expenditures');

        classChannel.listen('AllotmentClassDeleted', (e: { id: number }) => {
            setLocalExpenditures((prev) => prev.filter((exp) => exp.allotment_class_id !== e.id));
        });

        expenditureChannel.listen('ExpenditureDeleted', (e: { id: number }) => {
            setLocalExpenditures((prev) => prev.filter((exp) => exp.id !== e.id));
        });

        return () => {
            echoInstance.leave('allotment-classes');
            echoInstance.leave('expenditures');
        };
    }, [echoInstance]);

    useEffect(() => {
        setLocalExpenditures(expenditures);
    }, [expenditures]);

    const filteredExpenditures = useMemo(() => {
        return localExpenditures.filter(
            (expenditure) => selectedAllotmentClass.length === 0 || selectedAllotmentClass.includes(expenditure.allotment_class_id),
        );
    }, [localExpenditures, selectedAllotmentClass]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex w-full space-x-3">
                    <SearchInput id="search" name="search" search={search} setSearch={setSearch} />
                    <FilterPopover
                        data={allotmentClasses ?? []}
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
                </div>

                <Button type="button" onClick={() => handleOpenModal('create')}>
                    <Plus />
                    Create
                </Button>
            </div>

            <ExpenditureTable expenditures={filteredExpenditures} search={search} />

            <CreateExpenditure openModal={modal === 'create'} closeModal={handleCloseModal} allotmentClasses={allotmentClasses} />
            <EditExpenditure openModal={modal === 'edit'} closeModal={handleCloseModal} allotmentClasses={allotmentClasses} />
            <DeleteExpenditure openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const ExpenditureTable = ({ expenditures, search }: { expenditures: Expenditure[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = [
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
    ];

    const columns: ColumnDef<Expenditure>[] = [
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
            accessorKey: 'allotment_class_name',
            header: ({ column }) => <SortableHeader column={column} label="Allotment Class" />,
            cell: ({ row }) => <p>{String(row.original?.allotment_class_name)}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<Expenditure> columns={columns} data={expenditures} search={search} />;
};
