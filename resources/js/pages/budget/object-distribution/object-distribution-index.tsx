import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { ExpenditureProvider } from '@/contexts/expenditure-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import { type BreadcrumbItem, type Expenditure, type ObjectDistribution } from '@/types';
import { type ObjectDistributionFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import CreateObjectDistribution from './modals/create-object-distribution';
import DeleteObjectDistribution from './modals/delete-object-distribution';
import EditObjectDistribution from './modals/edit-object-distribution';

interface ObjectDistributionIndexProps {
    objectDistributions: ObjectDistribution[];
    expenditures: Expenditure[];
    search?: string;
}

export default function ObjectDistributionIndex({ objectDistributions, expenditures }: ObjectDistributionIndexProps) {
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
            title: 'Obligations',
            href: route('budget.obligations.index', { [allocationParam.key]: allocationParam.id }),
        },
        {
            title: 'Office Allotments',
            href: route('budget.office-allotments.index', { [allocationParam.key]: allocationParam.id }),
        },
        {
            title: 'Object Distributions',
            href: route('budget.object-distributions.index'),
        },
    ];

    const formDefaults: ObjectDistributionFormData = { allocation_id: Number(allocationParam.id), expenditure_id: 0, amount: '' };

    return (
        <ExpenditureProvider value={{ expenditures }}>
            <ModalProvider<ObjectDistributionFormData> formDefaults={formDefaults}>
                <Toaster position="bottom-center" />

                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Object Distributions" />
                    <ObjectDistributionContent objectDistributions={objectDistributions} expenditures={expenditures} />
                </AppLayout>
            </ModalProvider>
        </ExpenditureProvider>
    );
}

const ObjectDistributionContent = ({ objectDistributions }: ObjectDistributionIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <ObjectDistributionTable objectDistributions={objectDistributions} search={search} />

            <CreateObjectDistribution openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditObjectDistribution openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteObjectDistribution openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const ObjectDistributionTable = ({ objectDistributions, search }: { objectDistributions: ObjectDistribution[]; search: string }) => {
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

    const columns: ColumnDef<ObjectDistribution>[] = useMemo(
        () => [
            {
                accessorKey: 'expenditure_name',
                header: ({ column }) => <SortableHeader column={column} label="Expenditure" />,
                cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
            },
            {
                accessorKey: 'amount',
                header: ({ column }) => <SortableHeader column={column} label="Amount" />,
                cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
            },
        ],
        [dropdownItems],
    );

    return <DataTable<ObjectDistribution> columns={columns} data={objectDistributions} search={search} />;
};
