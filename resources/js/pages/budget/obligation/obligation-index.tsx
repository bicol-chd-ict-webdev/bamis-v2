import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import FilterPopover from '@/components/filter-popover';
import SearchInput from '@/components/search-input';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ObligationProvider } from '@/contexts/obligation-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney, FormatShortDate } from '@/lib/formatter';
import {
    Allocation,
    type BreadcrumbItem,
    type NorsaType,
    type ObjectDistribution,
    type Obligation,
    type OfficeAllotment,
    type Recipient,
} from '@/types';
import { type ObligationFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { HandCoins, PencilLine, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateObligation from './modals/create-obligation';
import DeleteObligation from './modals/delete-obligation';
import EditObligation from './modals/edit-obligation';
import ObligationProgress from './partials/obligation-progress';

interface ObligationIndexProps {
    allocation: Allocation;
    obligations: Obligation[];
    objectDistributions: ObjectDistribution[];
    officeAllotments: OfficeAllotment[];
    norsaTypes: NorsaType[];
    recipients: Recipient[];
    search?: string;
}

export default function ObligationIndex({
    allocation,
    obligations,
    objectDistributions,
    officeAllotments,
    norsaTypes,
    recipients,
}: ObligationIndexProps) {
    const allocationParam = useAllocationParam();

    if (!allocationParam) {
        return <p className="text-red-600">No valid allocation query param provided.</p>;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: allocationParam.title,
            href: route(allocationParam.indexRoute),
        },
        {
            title: 'Object Distributions',
            href: route('budget.object-distributions.index', { [allocationParam.key]: allocationParam.id }),
        },
        {
            title: 'Office Allotments',
            href: route('budget.office-allotments.index', { [allocationParam.key]: allocationParam.id }),
        },
        {
            title: 'Registry of Allotments, Obligations and Disbursements',
            href: route('budget.obligations.index'),
        },
    ];

    const formDefaults: ObligationFormData = {
        allocation_id: allocationParam.id,
        object_distribution_id: 0,
        office_allotment_id: 0,
        amount: '',
        date: new Date().toISOString().split('T')[0],
        creditor: '',
        particulars: '',
        is_transferred: false,
        recipient: '',
        is_batch_process: false,
        norsa_type: '',
        reference_number: '',
        dtrak_number: '',
    };

    return (
        <ObligationProvider value={{ allocation, obligations, objectDistributions, officeAllotments, norsaTypes, recipients }}>
            <ModalProvider<ObligationFormData> formDefaults={formDefaults}>
                <Toaster position="bottom-center" />

                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Registry of Allotments, Obligations" />
                    <ObligationContent
                        allocation={allocation}
                        obligations={obligations}
                        objectDistributions={objectDistributions}
                        officeAllotments={officeAllotments}
                        norsaTypes={norsaTypes}
                        recipients={recipients}
                    />
                </AppLayout>
            </ModalProvider>
        </ObligationProvider>
    );
}

const ObligationContent = ({ obligations, objectDistributions, officeAllotments }: ObligationIndexProps) => {
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const [search, setSearch] = useState<string>('');
    const [selectedExpenditure, setSelectedExpenditure] = useState<number[]>([]);
    const [selectedOffice, setSelectedOffice] = useState<number[]>([]);

    const handleFilterChange = (selectedExpenditureIds: number[]) => {
        setSelectedExpenditure(selectedExpenditureIds);
    };

    const handleFilterOfficeChange = (selectedOfficeIds: number[]) => {
        setSelectedOffice(selectedOfficeIds);
    };

    const resetFilters = () => {
        setSelectedExpenditure([]);
        setSelectedOffice([]);
    };

    const filteredObligations = useMemo(() => {
        return obligations.filter((obligation) => {
            const matchesExpenditure = selectedExpenditure.length === 0 || selectedExpenditure.includes(Number(obligation.object_distribution_id));
            const matchesOffice = selectedOffice.length === 0 || selectedOffice.includes(Number(obligation.office_allotment_id));

            return matchesExpenditure && matchesOffice;
        });
    }, [obligations, selectedExpenditure, selectedOffice]);

    return (
        <div className="flex h-full flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex w-full space-x-3">
                    <SearchInput id="search" name="search" search={search} setSearch={setSearch} />
                    <FilterPopover
                        data={objectDistributions}
                        onFilterChange={handleFilterChange}
                        selectedIds={selectedExpenditure}
                        setSelectedIds={setSelectedExpenditure}
                        placeholder="Expenditure"
                        keyField="id"
                        labelField="expenditure_name"
                        countField="obligations_count"
                    />

                    <FilterPopover
                        data={officeAllotments}
                        onFilterChange={handleFilterOfficeChange}
                        selectedIds={selectedOffice}
                        setSelectedIds={setSelectedOffice}
                        placeholder="Office"
                        keyField="id"
                        labelField="section_acronym"
                        countField="obligations_count"
                    />

                    {(selectedExpenditure.length > 0 || selectedOffice.length > 0) && (
                        <Button variant="ghost" onClick={resetFilters}>
                            Reset
                            <X className="size-4" />
                        </Button>
                    )}
                </div>

                <Button type="button" onClick={() => handleOpenModal('create')}>
                    <HandCoins />
                    Obligate
                </Button>
            </div>

            <ObligationProgress />
            <ObligationTable obligations={filteredObligations} search={search} />

            <CreateObligation openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditObligation openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteObligation openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const ObligationTable = ({ obligations, search }: { obligations: Obligation[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = [
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

    const columns: ColumnDef<Obligation>[] = [
        {
            accessorKey: 'date',
            header: ({ column }) => <SortableHeader column={column} label="Date" />,
            cell: ({ cell }) => <p>{FormatShortDate(String(cell.getValue()))}</p>,
        },
        {
            accessorKey: 'series',
            header: ({ column }) => <SortableHeader column={column} label="Series" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'dtrak_number',
            header: ({ column }) => <SortableHeader column={column} label="Dtrak" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'reference_number',
            header: ({ column }) => <SortableHeader column={column} label="Reference" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'uacs_code',
            header: ({ column }) => <SortableHeader column={column} label="UACS Code" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'creditor',
            header: ({ column }) => <SortableHeader column={column} label="Creditor" />,
            cell: ({ cell }) => (
                <p className="max-w-[250px] truncate xl:max-w-[350px]" title={String(cell.getValue())}>
                    {String(cell.getValue())}
                </p>
            ),
        },
        {
            accessorKey: 'particulars',
            header: ({ column }) => <SortableHeader column={column} label="Particulars" />,
            cell: ({ cell }) => (
                <p className="max-w-[250px] truncate xl:max-w-[350px]" title={String(cell.getValue())}>
                    {String(cell.getValue())}
                </p>
            ),
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => <SortableHeader column={column} label="Obligation" />,
            cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
        },

        {
            accessorKey: 'office',
            header: ({ column }) => <SortableHeader column={column} label="Office" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<Obligation> columns={columns} data={obligations} search={search} />;
};
