import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { OFFICE_ALLOTMENT_FORM_DEFAULTS } from '@/constants/form-defaults';
import { LoadingProvider, useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { OfficeAllotmentProvider, useOfficeAllotmentContext } from '@/contexts/office-allotment-context';
import { SearchProvider, useSearchContext } from '@/contexts/search-context';
import { SectionProvider } from '@/contexts/section-context';
import { useAllocationParam } from '@/hooks/use-allocation-param';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import CreateOfficeAllotment from '@/pages/budget/office-allotment/modals/create-office-allotment';
import DeleteOfficeAllotment from '@/pages/budget/office-allotment/modals/delete-office-allotment';
import EditOfficeAllotment from '@/pages/budget/office-allotment/modals/edit-office-allotment';
import budget from '@/routes/budget';
import type { BreadcrumbItem, Division, OfficeAllotment, Section } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Building, PencilLine, Plus, Split, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';

interface OfficeAllotmentIndexProps {
    officeAllotments: OfficeAllotment[];
    sections: Section[];
}

export default function OfficeAllotmentIndex({ officeAllotments, sections }: OfficeAllotmentIndexProps): JSX.Element {
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
            title: 'Object Distributions',
            href: budget.objectDistributions.index({ query: { [allocationParam.key]: allocationParam.id } }).url,
        },
        {
            title: 'Office Allotments',
            href: budget.officeAllotments.index().url,
        },
    ];

    return (
        <ModalProvider<OfficeAllotment> formDefaults={OFFICE_ALLOTMENT_FORM_DEFAULTS(Number(allocationParam.id))}>
            <LoadingProvider>
                <SearchProvider>
                    <SectionProvider value={{ sections }}>
                        <OfficeAllotmentProvider value={{ officeAllotments }}>
                            <AppLayout breadcrumbs={breadcrumbs}>
                                <Head title="Office Allotments" />
                                <OfficeAllotmentContent />
                            </AppLayout>
                        </OfficeAllotmentProvider>
                    </SectionProvider>
                </SearchProvider>
            </LoadingProvider>
        </ModalProvider>
    );
}

const OfficeAllotmentContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<OfficeAllotment>();
    const { search, setSearch } = useSearchContext();
    const { officeAllotments } = useOfficeAllotmentContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={officeAllotments.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <OfficeAllotmentTable />
            <Modals />
        </div>
    );
};

const OfficeAllotmentTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<OfficeAllotment>();
    const { search } = useSearchContext();
    const { officeAllotments } = useOfficeAllotmentContext();
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

    const columns: ColumnDef<OfficeAllotment>[] = [
        {
            accessorKey: 'section_name',
            header: ({ column }: HeaderContext<OfficeAllotment, unknown>): JSX.Element => <SortableHeader column={column} label="Office" />,
        },
        {
            accessorKey: 'wfp_code',
            header: ({ column }: HeaderContext<OfficeAllotment, unknown>): JSX.Element => <SortableHeader column={column} label="WFP Code" />,
        },
        {
            accessorKey: 'amount',
            header: ({ column }: HeaderContext<OfficeAllotment, unknown>): JSX.Element => <SortableHeader column={column} label="AmountCode" />,
            cell: ({ getValue }: CellContext<OfficeAllotment, unknown>): JSX.Element => <p>{FormatMoney(Number(getValue()))}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<OfficeAllotment, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (officeAllotments.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Building />}
                onAction={(): void => handleOpenModal('create')}
                title="Setup office budget"
                description="Define the specific amount and the receiving office to establish a baseline for obligations and disbursements."
            />
        );
    }

    return (
        <DataTable<OfficeAllotment>
            columns={columns}
            data={officeAllotments}
            search={search}
            isLoading={isLoading}
            icon={<Split />}
            emptyTitle="Office Allotment"
            emptyDescription="Office Allotments"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<Division>();

    return (
        <>
            {modal === 'create' && <CreateOfficeAllotment openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditOfficeAllotment openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteOfficeAllotment openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
