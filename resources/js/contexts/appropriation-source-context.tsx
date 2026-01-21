import type { AppropriationSourceEnum } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface AppropriationSourceContextProps {
    appropriationSources: AppropriationSourceEnum[];
}

const AppropriationSourceContext: Context<AppropriationSourceContextProps | null> = createContext<AppropriationSourceContextProps | null>(null);

export const useAppropriationSourceContext = (): AppropriationSourceContextProps => {
    const context: AppropriationSourceContextProps | null = useContext(AppropriationSourceContext);
    if (!context) throw new Error('useAppropriationSourceContext must be used inside AppropriationSourceProvider!');
    return context;
};

export const AppropriationSourceProvider = ({ children, value }: { children: ReactNode; value: AppropriationSourceContextProps }): JSX.Element => (
    <AppropriationSourceContext.Provider value={value}>{children}</AppropriationSourceContext.Provider>
);
