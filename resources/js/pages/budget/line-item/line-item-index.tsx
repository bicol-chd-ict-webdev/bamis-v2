import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import { LINE_ITEM_FORM_DEFAULTS } from '@/constants/form-defaults';
import { LineItemProvider, useLineItemContext } from '@/contexts/line-item-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import CreateLineItemModal from '@/pages/budget/line-item/modals/create-line-item-modal';
import DeleteLineItem from '@/pages/budget/line-item/modals/delete-line-items-modal';
import EditLineItem from '@/pages/budget/line-item/modals/edit-line-items-modal';
import budget from '@/routes/budget';
import type { BreadcrumbItem, LineItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ListTodo, PencilLine, Plus, Trash2 } from 'lucide-react';
import { JSX, memo, useMemo } from 'react';

interface LineItemIndexProps {
    lineItems: LineItem[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Line Items',
        href: budget.lineItems.index().url,
    },
];

export default function LineItemIndex({ lineItems }: LineItemIndexProps): JSX.Element {
    return (
        <ModalProvider formDefaults={LINE_ITEM_FORM_DEFAULTS}>
            <LineItemProvider value={{ lineItems }}>
                <AppLayout breadcrumbs={BREADCRUMBS}>
                    <Head title="Line Items" />
                    <DivisionContent />
                </AppLayout>
            </LineItemProvider>
        </ModalProvider>
    );
}

const DivisionContent = (): JSX.Element => {
    const { search, setSearch } = useSearchContext();
    const { handleOpenModal } = useModalContext<LineItem>();
    const { lineItems } = useLineItemContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={lineItems.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <LineItemTable />
            <Modals />
        </div>
    );
};

const LineItemTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<LineItem>();
    const { search } = useSearchContext();
    const { lineItems } = useLineItemContext();
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

    const columns: ColumnDef<LineItem>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<LineItem, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'acronym',
            header: ({ column }: HeaderContext<LineItem, unknown>): JSX.Element => <SortableHeader column={column} label="Acronym" />,
        },
        {
            accessorKey: 'code',
            header: ({ column }: HeaderContext<LineItem, unknown>): JSX.Element => <SortableHeader column={column} label="Code" />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<LineItem, unknown>): JSX.Element => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    if (lineItems.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<ListTodo />}
                onAction={(): void => handleOpenModal('create')}
                title="Start building your budget ledger"
                description="Create your first entry to begin tracking specific fund allocations for your projects and agency activities."
            />
        );
    }

    return (
        <DataTable<LineItem>
            columns={columns}
            data={lineItems}
            search={search}
            isLoading={isLoading}
            icon={<ListTodo />}
            emptyTitle="Line Item"
            emptyDescription="Line Items"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<LineItem>();

    return (
        <>
            {modal === 'create' && <CreateLineItemModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditLineItem openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteLineItem openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
