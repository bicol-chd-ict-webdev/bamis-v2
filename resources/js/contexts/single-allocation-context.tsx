import type { Allocation } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface SingleAllocationContextProps {
    allocation: Allocation;
}

const SingleAllocationContext: Context<SingleAllocationContextProps | null> = createContext<SingleAllocationContextProps | null>(null);

export const useSingleAllocationContext = (): SingleAllocationContextProps => {
    const context: SingleAllocationContextProps | null = useContext(SingleAllocationContext);
    if (!context) throw new Error('AllocationContext not found');
    return context;
};

export const SingleAllocationProvider = ({ children, value }: { children: ReactNode; value: SingleAllocationContextProps }): JSX.Element => (
    <SingleAllocationContext.Provider value={value}>{children}</SingleAllocationContext.Provider>
);
