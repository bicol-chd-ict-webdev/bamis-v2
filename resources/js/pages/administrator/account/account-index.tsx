import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import AccountStatus from '@/components/statuses/account-status';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type Account, type BreadcrumbItem } from '@/types';
import { AccountFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateAccount from './modals/create-account';
import EditAccount from './modals/edit-account';

interface AccountIndexProps {
    accounts: Account[];
    search?: string;
}

export default function AccountIndex({ accounts }: AccountIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Accounts',
            href: route('administrator.accounts.index'),
        },
    ];

    const formDefaults: AccountFormData = { name: '', email: '', designation: '', role: '', status: 'Active' };

    return (
        <ModalProvider<AccountFormData> formDefaults={formDefaults}>
            <Toaster position="bottom-center" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Accounts" />
                <AccountContent accounts={accounts} />
            </AppLayout>
        </ModalProvider>
    );
}

const AccountContent = ({ accounts }: AccountIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <AccountTable accounts={accounts} search={search} />

            <CreateAccount openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditAccount openModal={modal === 'edit'} closeModal={handleCloseModal} />
        </div>
    );
};

const AccountTable = ({ accounts, search }: AccountIndexProps) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = [
        {
            label: 'Edit',
            action: 'edit',
            handler: (row: any) => handleOpenModal('edit', row.original),
        },
    ];

    const columns: ColumnDef<Account>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => <SortableHeader column={column} label="Name" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'email',
            header: ({ column }) => <SortableHeader column={column} label="Email" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'designation',
            header: ({ column }) => <SortableHeader column={column} label="Designation" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <SortableHeader column={column} label="Status" />,
            cell: ({ cell }) => <AccountStatus status={String(cell.getValue())} />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<Account> columns={columns} data={accounts} search={search} />;
};
