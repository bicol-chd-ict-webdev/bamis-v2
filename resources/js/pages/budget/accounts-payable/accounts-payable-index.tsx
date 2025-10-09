import DataTable from '@/components/data-table';
import FilterPopover from '@/components/filter-popover';
import SearchInput from '@/components/search-input';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney, FormatShortDate } from '@/lib/formatter';
import type { BreadcrumbItem, Expenditure, Obligation, OfficeAllotment } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface AccountsPayableIndexProps {
    accountsPayables: Obligation[];
    expenditures: Expenditure[];
    officeAllotments: OfficeAllotment[];
    search?: string;
}

export default function AccountsPayableIndex({ accountsPayables, expenditures, officeAllotments }: AccountsPayableIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Accounts Payables',
            href: route('budget.accounts-payables.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accounts Payables" />
            <AccountsPayableContent accountsPayables={accountsPayables} expenditures={expenditures} officeAllotments={officeAllotments} />
        </AppLayout>
    );
}

const AccountsPayableContent = ({ accountsPayables, expenditures, officeAllotments }: AccountsPayableIndexProps) => {
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

    const filteredAccountsPayables = useMemo(() => {
        return accountsPayables.filter((obligation) => {
            const matchesExpenditure = selectedExpenditure.length === 0 || selectedExpenditure.includes(Number(obligation.expenditure_id));

            const matchesOffice = selectedOffice.length === 0 || selectedOffice.includes(Number(obligation.office_allotment_id));

            return matchesExpenditure && matchesOffice;
        });
    }, [accountsPayables, selectedExpenditure, selectedOffice]);

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex w-full space-x-3">
                        <SearchInput id="search" name="search" search={search} setSearch={setSearch} />
                        <FilterPopover
                            data={expenditures}
                            onFilterChange={handleFilterChange}
                            selectedIds={selectedExpenditure}
                            setSelectedIds={setSelectedExpenditure}
                            placeholder="Expenditure"
                            keyField="id"
                            labelField="name"
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
                </div>

                <AccountsPayableTable accountsPayables={filteredAccountsPayables} search={search} />
            </div>
        </>
    );
};

const AccountsPayableTable = ({ accountsPayables, search }: { accountsPayables: Obligation[]; search: string }) => {
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
                cell: ({ cell }) => <p>{cell.getValue() ? String(cell.getValue()) : '-/-'}</p>,
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
                cell: ({ row }) => <p>{FormatMoney(row.original.offices[0].amount)}</p>,
            },
            {
                accessorKey: 'disbursements_sum_amount',
                header: ({ column }) => <SortableHeader column={column} label="Disbursement" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'balance',
                header: ({ column }) => <SortableHeader column={column} label="Balance" />,
                cell: ({ cell }) => <p className="text-destructive">{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'office',
                header: ({ column }) => <SortableHeader column={column} label="Office" />,
                cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
            },
        ],
        [],
    );

    return <DataTable<Obligation> columns={columns} data={accountsPayables} search={search} />;
};
