import type { Appropriation } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface AppropriationContextProps {
    appropriations: Appropriation[];
}

const AppropriationContext: Context<AppropriationContextProps | null> = createContext<AppropriationContextProps | null>(null);

export const useAppropriationContext = (): AppropriationContextProps => {
    const context: AppropriationContextProps | null = useContext(AppropriationContext);
    if (!context) throw new Error('useAppropriationContext must be used inside AppropriationProvider!');
    return context;
};

export function AppropriationProvider({ children, value }: { children: ReactNode; value: AppropriationContextProps }): JSX.Element {
    return <AppropriationContext.Provider value={value}>{children}</AppropriationContext.Provider>;
}
