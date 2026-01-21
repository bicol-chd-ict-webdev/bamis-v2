import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { OBJECT_DISTRIBUTION_FORM_DEFAULTS } from '@/constants/form-defaults';
import { ExpenditureProvider } from '@/contexts/expenditure-context';
import { LoadingProvider, useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ObjectDistributionProvider, useObjectDistributionContext } from '@/contexts/object-distribution-context';
import { SearchProvider, useSearchContext } from '@/contexts/search-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import budget from '@/routes/budget';
import type { BreadcrumbItem, Expenditure, ObjectDistribution } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { PencilLine, Plus, Split, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';
import CreateObjectDistribution from './modals/create-object-distribution';
import DeleteObjectDistribution from './modals/delete-object-distribution';
import EditObjectDistribution from './modals/edit-object-distribution';

interface ObjectDistributionIndexProps {
    objectDistributions: ObjectDistribution[];
    expenditures: Expenditure[];
}

export default function ObjectDistributionIndex({ objectDistributions, expenditures }: ObjectDistributionIndexProps): JSX.Element {
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
            href: budget.obligations.index({ query: { [allocationParam.key]: allocationParam.id } }).url,
        },
        {
            title: 'Office Allotments',
            href: budget.officeAllotments.index({ query: { [allocationParam.key]: allocationParam.id } }).url,
        },
        {
            title: 'Object Distributions',
            href: budget.objectDistributions.index().url,
        },
    ];

    return (
        <ModalProvider<ObjectDistribution> formDefaults={OBJECT_DISTRIBUTION_FORM_DEFAULTS(Number(allocationParam.id))}>
            <LoadingProvider>
                <SearchProvider>
                    <ExpenditureProvider value={{ expenditures }}>
                        <ObjectDistributionProvider value={{ objectDistributions }}>
                            <AppLayout breadcrumbs={breadcrumbs}>
                                <Head title="Object Distributions" />
                                <ObjectDistributionContent />
                            </AppLayout>
                        </ObjectDistributionProvider>
                    </ExpenditureProvider>
                </SearchProvider>
            </LoadingProvider>
        </ModalProvider>
    );
}

const ObjectDistributionContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<ObjectDistribution>();
    const { search, setSearch } = useSearchContext();
    const { objectDistributions } = useObjectDistributionContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={objectDistributions.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <ObjectDistributionTable />
            <Modals />
        </div>
    );
};

const ObjectDistributionTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<ObjectDistribution>();
    const { search } = useSearchContext();
    const { objectDistributions } = useObjectDistributionContext();
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

    const columns: ColumnDef<ObjectDistribution>[] = [
        {
            accessorKey: 'expenditure_name',
            header: ({ column }: HeaderContext<ObjectDistribution, unknown>): JSX.Element => <SortableHeader column={column} label="Expenditure" />,
        },
        {
            accessorKey: 'amount',
            header: ({ column }: HeaderContext<ObjectDistribution, unknown>): JSX.Element => <SortableHeader column={column} label="Amount" />,
            cell: ({ getValue }: CellContext<ObjectDistribution, unknown>): JSX.Element => <p>{FormatMoney(Number(getValue()))}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<ObjectDistribution, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (objectDistributions.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Split />}
                onAction={(): void => handleOpenModal('create')}
                title="Break down expenditure"
                description="Define specific expenditure items and assign their corresponding amounts."
            />
        );
    }

    return (
        <DataTable<ObjectDistribution>
            columns={columns}
            data={objectDistributions}
            search={search}
            isLoading={isLoading}
            icon={<Split />}
            emptyTitle="Object Distribution"
            emptyDescription="Object Distributions"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<ObjectDistribution>();

    return (
        <>
            {modal === 'create' && <CreateObjectDistribution openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditObjectDistribution openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteObjectDistribution openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
