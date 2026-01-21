import type { Expenditure } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface ExpenditureContextProps {
    expenditures: Expenditure[];
}

const ExpenditureContext: Context<ExpenditureContextProps | null> = createContext<ExpenditureContextProps | null>(null);

export const useExpenditureContext = (): ExpenditureContextProps => {
    const context: ExpenditureContextProps | null = useContext(ExpenditureContext);
    if (!context) throw new Error('useExpenditureContext must be used inside ExpenditureProvider!');
    return context;
};

export const ExpenditureProvider = ({ children, value }: { children: ReactNode; value: ExpenditureContextProps }): JSX.Element => (
    <ExpenditureContext.Provider value={value}>{children}</ExpenditureContext.Provider>
);
