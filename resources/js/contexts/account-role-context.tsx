import type { Role } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface AccountRoleContextProps {
    roles: Role[];
}

const AccountRoleContext: Context<AccountRoleContextProps | null> = createContext<AccountRoleContextProps | null>(null);

export const useAccountRoleContext = (): AccountRoleContextProps => {
    const context: AccountRoleContextProps | null = useContext(AccountRoleContext);
    if (!context) throw new Error('useAccountRoleContext must be used within an AccountRoleProvider!');
    return context;
};

export const AccountRoleProvider = ({ children, value }: { children: ReactNode; value: AccountRoleContextProps }): JSX.Element => {
    return <AccountRoleContext.Provider value={value}>{children}</AccountRoleContext.Provider>;
};
