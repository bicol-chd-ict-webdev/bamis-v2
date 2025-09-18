import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import FilterPopover from '@/components/filter-popover';
import { NorsaList } from '@/components/norsa-list';
import SearchInput from '@/components/search-input';
import SortableHeader from '@/components/sortable-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ObligationProvider } from '@/contexts/obligation-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney, FormatShortDate } from '@/lib/formatter';
import {
    type Allocation,
    type BreadcrumbItem,
    type NorsaType,
    type ObjectDistribution,
    type Obligation,
    type OfficeAllotment,
    type Recipient,
} from '@/types';
import { type ObligationFormData } from '@/types/form-data';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Coins, HandCoins, PencilLine, Trash2, View, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateDisbursement from '../disbursement/modals/create-disbursement';
import CreateObligation from './modals/create-obligation';
import DeleteObligation from './modals/delete-obligation';
import EditObligation from './modals/edit-obligation';
import ViewObligation from './modals/view-obligation';
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
            title: 'Obligations',
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
        norsa_type: '',
        reference_number: '',
        dtrak_number: '',
        series: '',
        tagged_obligation_id: '',
        oras_number_reference: '',
        tagged_obligations: [],
        related_obligation: [],
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
            {obligations.length < 1 ? (
                <>
                    <ObligationProgress />
                    <div className="border-border flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center text-sm">
                        <HandCoins className="mb-2 size-12" strokeWidth={1} />
                        <h2 className="my-1 text-base font-semibold">No obligations logged</h2>
                        <p className="text-muted-foreground mb-6">
                            There are no recorded financial obligations at this time. Submit obligation requests to initiate processing.
                        </p>
                        <Button type="button" onClick={() => handleOpenModal('create')}>
                            <HandCoins />
                            <span>Obligate</span>
                        </Button>
                    </div>
                </>
            ) : (
                <>
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
                </>
            )}

            <CreateDisbursement openModal={modal === 'disburse'} closeModal={handleCloseModal} />
            <CreateObligation openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditObligation openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteObligation openModal={modal === 'delete'} closeModal={handleCloseModal} />
            <ViewObligation openModal={modal === 'view'} closeModal={handleCloseModal} />
        </div>
    );
};

const ObligationTable = ({ obligations, search }: { obligations: Obligation[]; search: string }) => {
    const { handleOpenModal } = useModalContext();
    const allocationParam = useAllocationParam();

    if (!allocationParam) {
        return <p className="text-red-600">No valid allocation query param provided.</p>;
    }

    const dropdownItems = useMemo(
        () => [
            {
                icon: <Coins />,
                label: 'Disburse',
                action: 'view',
                disabled: (row: any) => row.original.tagged_obligation_id,
                handler: (row: any) =>
                    router.get(
                        route('budget.obligations.disbursements.index', {
                            [allocationParam.key]: allocationParam.id,
                            obligation: row.original.id,
                        }),
                    ),
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
        ],
        [handleOpenModal],
    );

    const columns: ColumnDef<Obligation>[] = useMemo(
        () => [
            {
                accessorKey: 'date',
                header: ({ column }) => <SortableHeader column={column} label="Date" />,
                cell: ({ cell }) => <p>{FormatShortDate(String(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'oras_number_reference',
                header: ({ column }) => <SortableHeader column={column} label="ORAS Number" />,
                cell: ({ row }) =>
                    row.original?.tagged_obligations?.data.length > 0 || row.original?.related_obligation ? (
                        <HoverCard>
                            <HoverCardTrigger>
                                <div className="grid">
                                    {row.original.tagged_obligation_id && (
                                        <Badge variant={row.original.norsa_type === 'Current Obligation' ? 'default' : 'destructive'}>
                                            NORSA - {row.original.norsa_type}
                                        </Badge>
                                    )}
                                    <span>{String(row.original.oras_number_reference)}</span>
                                </div>
                            </HoverCardTrigger>

                            <HoverCardContent align="start" className="w-full text-sm">
                                <NorsaList
                                    taggedObligations={row.original?.tagged_obligations?.data}
                                    relatedObligation={row.original?.related_obligation?.data}
                                />
                            </HoverCardContent>
                        </HoverCard>
                    ) : (
                        <div className="grid">
                            {row.original.tagged_obligation_id && (
                                <Badge variant={row.original.norsa_type === 'Current Obligation' ? 'default' : 'destructive'}>
                                    NORSA - {row.original.norsa_type}
                                </Badge>
                            )}
                            <span>{String(row.original.oras_number_reference)}</span>
                        </div>
                    ),
            },
            {
                accessorKey: 'dtrak_number',
                header: ({ column }) => <SortableHeader column={column} label="Dtrak" />,
                cell: ({ cell }) => <p>{cell.getValue() ? String(cell.getValue()) : '-/-'}</p>,
            },
            {
                accessorKey: 'reference_number',
                header: ({ column }) => <SortableHeader column={column} label="Reference" />,
                cell: ({ cell }) => <p>{cell.getValue() ? String(cell.getValue()) : '-/-'}</p>,
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
                accessorKey: 'disbursements_sum_amount',
                header: ({ column }) => <SortableHeader column={column} label="Disbursement" />,
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
        ],
        [dropdownItems],
    );

    return <DataTable<Obligation> columns={columns} data={obligations} search={search} />;
};
