import budget from '@/routes/budget';
import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { Button } from '@/components/ui/button';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney, FormatShortDate } from '@/lib/formatter';
import { type BreadcrumbItem, type Disbursement } from '@/types';
import { type DisbursementFormData } from '@/types/form-data';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Coins, PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateDisbursement from './modals/create-disbursement';
import DeleteDisbursement from './modals/delete-disbursement';
import EditDisbursement from './modals/edit-disbursement';

interface DisbursementIndexProps {
    disbursements: Disbursement[];
    disbursable: boolean;
    search?: string;
}

export default function DisbursementIndex({ disbursements, disbursable }: DisbursementIndexProps) {
    const allocationParam = useAllocationParam();

    if (!allocationParam) {
        return <p className="text-red-600">No valid allocation query param provided.</p>;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: allocationParam.title,
            href: allocationParam.indexRoute,
        },
        {
            title: 'Obligations',
            href: budget.obligations.index({ [allocationParam.key]: allocationParam.id }).url,
        },
        {
            title: 'Disbursements',
            href: '',
        },
    ];

    const { url } = usePage();
    const obligationId = url.match(/\/budget\/obligations\/(\d+)/)?.[1];

    const formDefaults: DisbursementFormData = {
        net_amount: '',
        date: new Date().toISOString().split('T')[0],
        obligation_id: Number(obligationId),
        tax: '',
        retention: '',
        penalty: '',
        absences: '',
        other_deductions: '',
        check_date: '',
        check_number: '',
        remarks: '',
    };

    return (
        <ModalProvider<DisbursementFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Disbursements" />
                <DisbursementContent disbursements={disbursements} disbursable={disbursable} />
            </AppLayout>
        </ModalProvider>
    );
}

const DisbursementContent = ({ disbursements, disbursable }: DisbursementIndexProps) => {
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();
    const [search, setSearch] = useState<string>('');

    return (
        <div className="flex h-full flex-1 flex-col gap-4 p-4">
            {disbursements.length < 1 ? (
                <div className="border-border flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center text-sm">
                    <Coins className="mb-2 size-12" strokeWidth={1} />
                    <h2 className="my-1 text-base font-semibold">No disbursements yet</h2>
                    <p className="text-muted-foreground mb-6">Start by processing financial obligations to initiate the disbursement workflow.</p>
                    <Button type="button" onClick={() => handleOpenModal('create')}>
                        <Coins />
                        <span>Disburse</span>
                    </Button>
                </div>
            ) : (
                <>
                    <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} icon={<Coins />} text="Disburse" disabled={disbursable} />
                    <DisbursementTable disbursements={disbursements} search={search} />
                </>
            )}

            <CreateDisbursement openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditDisbursement openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteDisbursement openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const DisbursementTable = ({ disbursements, search }: { disbursements: Disbursement[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = useMemo(
        () => [
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

    const columns: ColumnDef<Disbursement>[] = useMemo(
        () => [
            {
                accessorKey: 'date',
                header: ({ column }) => <SortableHeader column={column} label="Date" />,
                cell: ({ cell }) => <p>{FormatShortDate(String(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'check_number',
                header: ({ column }) => <SortableHeader column={column} label="Check Number" />,
                cell: ({ cell }) => <p>{cell.getValue() ? String(cell.getValue()) : '-/-'}</p>,
            },
            {
                accessorKey: 'check_date',
                header: ({ column }) => <SortableHeader column={column} label="Check Date" />,
                cell: ({ cell }) => <p>{FormatShortDate(String(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'net_amount',
                header: ({ column }) => <SortableHeader column={column} label="Net Amount" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'tax',
                header: ({ column }) => <SortableHeader column={column} label="Tax" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'retention',
                header: ({ column }) => <SortableHeader column={column} label="Retention" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'penalty',
                header: ({ column }) => <SortableHeader column={column} label="Penalty" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'absences',
                header: ({ column }) => <SortableHeader column={column} label="Absences" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'other_deductions',
                header: ({ column }) => <SortableHeader column={column} label="Other Deductions" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                accessorKey: 'remarks',
                header: ({ column }) => <SortableHeader column={column} label="Remarks" />,
                cell: ({ cell }) => (
                    <p className="max-w-[250px] truncate xl:max-w-[350px]" title={String(cell.getValue())}>
                        {cell.getValue() !== undefined ? String(cell.getValue()) : '-/-'}
                    </p>
                ),
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return <DataTable<Disbursement> columns={columns} data={disbursements} search={search} />;
};
