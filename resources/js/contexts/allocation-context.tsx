import type { Allocation, AppropriationSourceEnum } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface AllocationContextProps {
    allocations: Allocation[];
    appropriationSources: AppropriationSourceEnum[];
}

const AllocationContext: Context<AllocationContextProps | null> = createContext<AllocationContextProps | null>(null);

export const useAllocationContext = (): AllocationContextProps => {
    const context: AllocationContextProps | null = useContext(AllocationContext);
    if (!context) throw new Error('AllocationContext not found');
    return context;
};

export const AllocationProvider = ({ children, value }: { children: ReactNode; value: AllocationContextProps }): JSX.Element => (
    <AllocationContext.Provider value={value}>{children}</AllocationContext.Provider>
);
