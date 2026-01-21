import DataTable from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import SearchHeader from '@/components/search-header';
import SortableHeader from '@/components/sortable-header';
import AccountStatusBadge from '@/components/statuses/account-status-badge';
import { Button } from '@/components/ui/button';
import { USER_FORM_DEFAULTS } from '@/constants/form-defaults';
import { AccountProvider, useAccountContext } from '@/contexts/account-context';
import { AccountRoleProvider } from '@/contexts/account-role-context';
import { useLoadingContext } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useSearchContext } from '@/contexts/search-context';
import AppLayout from '@/layouts/app-layout';
import CreateAccountModal from '@/pages/administrator/account/modals/create-account-modal';
import EditAccountModal from '@/pages/administrator/account/modals/edit-account-modal';
import { index } from '@/routes/administrator/accounts';
import type { BreadcrumbItem, Role, User } from '@/types';
import { Head } from '@inertiajs/react';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Plus, Users } from 'lucide-react';
import { JSX, memo } from 'react';

interface AccountIndexProps {
    users: User[];
    roles: Role[];
}

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: index().url,
    },
];

export default function AccountIndex({ users, roles }: AccountIndexProps): JSX.Element {
    return (
        <ModalProvider<User> formDefaults={USER_FORM_DEFAULTS}>
            <AccountProvider value={{ users }}>
                <AccountRoleProvider value={{ roles }}>
                    <AppLayout breadcrumbs={BREADCRUMBS}>
                        <Head title="Accounts" />
                        <AccountContent />
                    </AppLayout>
                </AccountRoleProvider>
            </AccountProvider>
        </ModalProvider>
    );
}

const AccountContent = (): JSX.Element => {
    const { users } = useAccountContext();
    const { search, setSearch } = useSearchContext();
    const { handleOpenModal } = useModalContext<User>();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <SearchHeader
                search={search}
                onSearchChange={setSearch}
                showAction={users.length > 0}
                actionLabel="Create"
                actionIcon={<Plus />}
                onActionClick={(): void => handleOpenModal('create')}
            />
            <AccountTable />
            <Modals />
        </div>
    );
};

const AccountTable = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<User>();
    const { search } = useSearchContext();
    const { users } = useAccountContext();
    const { isLoading } = useLoadingContext();

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: ({ column }: HeaderContext<User, unknown>): JSX.Element => <SortableHeader column={column} label="Name" />,
        },
        {
            accessorKey: 'email',
            header: ({ column }: HeaderContext<User, unknown>): JSX.Element => <SortableHeader column={column} label="Email" />,
        },
        {
            accessorKey: 'designation',
            header: ({ column }: HeaderContext<User, unknown>): JSX.Element => <SortableHeader column={column} label="Designation" />,
        },
        {
            accessorKey: 'role',
            header: ({ column }: HeaderContext<User, unknown>): JSX.Element => <SortableHeader column={column} label="Role" />,
            cell: ({ getValue }: CellContext<User, unknown>): JSX.Element => <p className="capitalize">{getValue<string>()}</p>,
        },
        {
            accessorKey: 'status',
            header: ({ column }: HeaderContext<User, unknown>): JSX.Element => <SortableHeader column={column} label="Status" />,
            cell: ({ getValue }: CellContext<User, unknown>): JSX.Element => <AccountStatusBadge status={getValue<string>()} />,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: CellContext<User, unknown>): JSX.Element => (
                <div className="flex flex-1 items-center justify-end">
                    <Button variant="link" onClick={(): void => handleOpenModal('edit', row.original)}>
                        Update
                    </Button>
                </div>
            ),
        },
    ];

    if (users.length === 0 && !isLoading) {
        return (
            <EmptyState
                icon={<Users />}
                onAction={(): void => handleOpenModal('create')}
                title="No accounts yet"
                description="You haven't added any user accounts yet. Create your first account to start managing users and permissions."
            />
        );
    }

    return (
        <DataTable<User>
            columns={columns}
            data={users}
            search={search}
            isLoading={isLoading}
            icon={<Users />}
            emptyTitle="Account"
            emptyDescription="Accounts"
        />
    );
};

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<User>();

    return (
        <>
            {modal === 'create' && <CreateAccountModal openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditAccountModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});
