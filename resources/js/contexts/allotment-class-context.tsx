import type { AllotmentClass } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface AllotmentClassContextProps {
    allotmentClasses: AllotmentClass[];
}

const AllotmentClassContext: Context<AllotmentClassContextProps | null> = createContext<AllotmentClassContextProps | null>(null);

export const useAllotmentClassContext = (): AllotmentClassContextProps => {
    const context: AllotmentClassContextProps | null = useContext(AllotmentClassContext);
    if (!context) throw new Error('useAllotmentClassContext must be used inside AllotmentClassProvider!');
    return context;
};

export function AllotmentClassProvider({ children, value }: { children: ReactNode; value: AllotmentClassContextProps }): JSX.Element {
    return <AllotmentClassContext.Provider value={value}>{children}</AllotmentClassContext.Provider>;
}
