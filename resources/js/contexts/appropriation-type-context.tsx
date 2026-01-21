import type { AppropriationType } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface AppropriationTypeContextProps {
    appropriationTypes: AppropriationType[];
}

const AppropriationTypeContext: Context<AppropriationTypeContextProps | null> = createContext<AppropriationTypeContextProps | null>(null);

export const useAppropriationTypeContext = (): AppropriationTypeContextProps => {
    const context: AppropriationTypeContextProps | null = useContext(AppropriationTypeContext);
    if (!context) throw new Error('useAppropriationTypeContext must be used inside AppropriationTypeProvider!');
    return context;
};

export function AppropriationTypeProvider({ children, value }: { children: ReactNode; value: AppropriationTypeContextProps }): JSX.Element {
    return <AppropriationTypeContext.Provider value={value}>{children}</AppropriationTypeContext.Provider>;
}
