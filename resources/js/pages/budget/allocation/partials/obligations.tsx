import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import GlassyCard from '@/components/glassy-card';
import SortableHeader from '@/components/sortable-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { OBLIGATION_FORM_DEFAULTS } from '@/constants/form-defaults';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useObligationContext } from '@/contexts/obligation-context';
import { useSearchContext } from '@/contexts/search-context';
import { useSingleAllocationContext } from '@/contexts/single-allocation-context';
import { FormatMoney, FormatShortDate } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import DisbursementModals from '@/pages/budget/disbursement/disbursement-modals';
import ObligationModals from '@/pages/budget/obligation/obligation-modals';
import type { Obligation } from '@/types';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Ban, CalendarCheck, Coins, HandCoins, Link, PencilLine, Search as SearchIcon, ShieldAlert, Trash2, View } from 'lucide-react';
import { ChangeEvent, JSX, useMemo } from 'react';

const Obligations = (): JSX.Element => {
    const { allocation } = useSingleAllocationContext();

    return (
        <ModalProvider<Obligation> formDefaults={OBLIGATION_FORM_DEFAULTS(Number(allocation.id))}>
            <ObligationsContent />
        </ModalProvider>
    );
};

const ObligationsContent = (): JSX.Element => {
    return (
        <>
            <ObligationsTable />
            <ObligationModals />
            <DisbursementModals />
        </>
    );
};

const ObligationsTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<Obligation>();
    const { search, setSearch } = useSearchContext();
    const { obligations } = useObligationContext();
    const { isLoading } = useLoadingContext();

    const dropdownItems = useMemo(
        () => [
            {
                icon: <Coins />,
                label: 'Disbursements',
                action: 'view',
                disabled: (row: any): any => row.original.norsa_type || row.original.is_transferred || row.original.is_cancelled,
                handler: (row: any): void => handleOpenModal('disburse', row.original),
            },
            {
                isSeparator: true,
            },
            {
                icon: <Ban />,
                label: 'Cancel Obligation',
                action: 'view',
                disabled: (row: any): any => row.original.is_cancelled,
                handler: (row: any): void => handleOpenModal('cancel', row.original),
            },
            {
                icon: <CalendarCheck />,
                label: 'Due and Demandable',
                action: 'view',
                disabled: true,
                handler: (): void => {},
            },
            {
                isSeparator: true,
            },
            {
                icon: <View />,
                label: 'View',
                action: 'view',
                handler: (row: any): void => handleOpenModal('view', row.original),
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

    const columns: ColumnDef<Obligation>[] = useMemo(
        () => [
            {
                accessorKey: 'date',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Date" />,
                cell: ({ getValue }: CellContext<Obligation, unknown>): JSX.Element => <p>{FormatShortDate(String(getValue()))}</p>,
            },
            {
                accessorKey: 'norsa_type',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="NORSA" />,
                cell: ({ row }: CellContext<Obligation, unknown>): JSX.Element => (
                    <>
                        {row.original.norsa_type === undefined ? (
                            <Badge variant="secondary">Standard Obligation</Badge>
                        ) : (
                            <div className="flex flex-col items-start">
                                <Badge variant="outline" className="border-orange-200 bg-orange-100">
                                    <ShieldAlert className="text-orange-500" />
                                    <span className="text-orange-600">{row.original.norsa_type}</span>
                                </Badge>
                                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Link className="size-3" /> {row.original.related_obligation?.data[0]?.oras_number_reference}
                                </p>
                            </div>
                        )}
                    </>
                ),
            },
            {
                accessorKey: 'oras_number_reference',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="ORAS Number" />,
            },
            {
                accessorKey: 'dtrak_number',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Dtrak" />,
                cell: ({ getValue }: CellContext<Obligation, unknown>): JSX.Element => (
                    <p className={getValue() ? '' : 'text-xs text-muted-foreground italic'}>{getValue() ? String(getValue()) : 'Not Available'}</p>
                ),
            },
            {
                accessorKey: 'reference_number',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Reference" />,
                cell: ({ getValue }: CellContext<Obligation, unknown>): JSX.Element => (
                    <p className={getValue() ? '' : 'text-xs text-muted-foreground italic'}>{getValue() ? String(getValue()) : 'Not Available'}</p>
                ),
            },
            {
                accessorKey: 'uacs_code',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="UACS Code" />,
            },
            {
                accessorKey: 'creditor',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Creditor" />,
                cell: ({ getValue }: CellContext<Obligation, unknown>): JSX.Element => (
                    <p className="max-w-62.5 truncate xl:max-w-87.5" title={String(getValue())}>
                        {String(getValue())}
                    </p>
                ),
            },
            {
                accessorKey: 'particulars',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Particulars" />,
                cell: ({ row }: CellContext<Obligation, unknown>): JSX.Element => (
                    <TruncatedCell value={String(row.original.particulars)} isCancelled={row.original.is_cancelled} />
                ),
            },
            {
                id: 'amount',
                accessorFn: (row: Obligation): string => row.offices[0].amount,
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Obligation" />,
                cell: ({ getValue }: CellContext<Obligation, unknown>): JSX.Element => {
                    const value = getValue() as string | number | undefined;
                    return <p>{FormatMoney(Number(value || 0))}</p>;
                },
            },
            {
                accessorKey: 'disbursements_sum_amount',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Disbursement" />,
                cell: ({ getValue }: CellContext<Obligation, unknown>): JSX.Element => {
                    const value = getValue() as string | number | undefined;
                    return <p>{FormatMoney(Number(value || 0))}</p>;
                },
            },
            {
                accessorKey: 'balance',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Balance" />,
                cell: ({ getValue }: CellContext<Obligation, unknown>): JSX.Element => (
                    <p className="text-destructive">{FormatMoney(Number(getValue()))}</p>
                ),
            },
            {
                accessorKey: 'office',
                header: ({ column }: HeaderContext<Obligation, unknown>): JSX.Element => <SortableHeader column={column} label="Office" />,
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }: CellContext<Obligation, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return (
        <GlassyCard className="pb-4">
            <ObligationsHeader onCreateClick={(): void => handleOpenModal('create')} search={search} onSearchChange={setSearch} />

            {obligations.length === 0 && !isLoading ? (
                <EmptyState
                    icon={<HandCoins />}
                    title="No obligations logged"
                    description="There are no recorded financial obligations at this time. Submit obligation requests to initiate processing."
                />
            ) : (
                <DataTable<Obligation>
                    columns={columns}
                    data={obligations}
                    search={search}
                    isLoading={isLoading}
                    icon={<HandCoins />}
                    emptyTitle="Obligation"
                    emptyDescription="Obligations"
                    withCard={false}
                />
            )}
        </GlassyCard>
    );
};

const ObligationsHeader = ({
    onCreateClick,
    search,
    onSearchChange,
}: {
    onCreateClick: () => void;
    search: string;
    onSearchChange: (value: string) => void;
}): JSX.Element => (
    <div className="m-4 flex items-center justify-between">
        <div className="grid gap-1.5">
            <CardTitle>Commitment Ledger</CardTitle>
            <CardDescription>Track obligations and commitment logs.</CardDescription>
        </div>

        <div className="flex items-center gap-2">
            <InputGroup className="max-w-72">
                <InputGroupInput
                    name="search"
                    autoComplete="off"
                    placeholder="Search obligation..."
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value)}
                />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            <Button onClick={onCreateClick} title="Create Office Allotment">
                <HandCoins />
                <span>Obligate</span>
            </Button>
        </div>
    </div>
);

const TruncatedCell = ({ value, isCancelled }: { value: string; isCancelled: boolean }): JSX.Element => (
    <p className={cn('max-w-62.5 truncate xl:max-w-87.5', isCancelled && 'text-destructive')} title={value}>
        {value}
    </p>
);

export default Obligations;
