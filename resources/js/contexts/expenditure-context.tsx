import { type Expenditure } from '@/types';
import { createContext, useContext } from 'react';

interface ExpenditureContextProps {
    expenditures: Expenditure[];
}

const ExpenditureContext = createContext<ExpenditureContextProps | null>(null);

export const useExpenditureContext = () => {
    const context = useContext(ExpenditureContext);
    if (!context) throw new Error('Expenditure context not found');
    return context;
};

export const ExpenditureProvider = ({ children, value }: { children: React.ReactNode; value: ExpenditureContextProps }) => (
    <ExpenditureContext.Provider value={value}>{children}</ExpenditureContext.Provider>
);
