import type { User } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface AccountContextProps {
    users: User[];
}

const AccountContext: Context<AccountContextProps | null> = createContext<AccountContextProps | null>(null);

export const useAccountContext = (): AccountContextProps => {
    const context: AccountContextProps | null = useContext(AccountContext);
    if (!context) throw new Error('useAccountContext must be used inside AccountProvider');
    return context;
};

export function AccountProvider({ children, value }: { children: ReactNode; value: AccountContextProps }): JSX.Element {
    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
