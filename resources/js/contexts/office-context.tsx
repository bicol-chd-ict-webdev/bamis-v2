import type { Section } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface OfficeContextProps {
    officeAllotmentsGroupedBySection: Section[];
}

const OfficeContext: Context<OfficeContextProps | null> = createContext<OfficeContextProps | null>(null);

export const useOfficeContext = (): OfficeContextProps => {
    const context: OfficeContextProps | null = useContext(OfficeContext);
    if (!context) throw new Error('useOfficeContext must be used inside OfficeProvider!');
    return context;
};

export function OfficeProvider({ children, value }: { children: ReactNode; value: OfficeContextProps }): JSX.Element {
    return <OfficeContext.Provider value={value}>{children}</OfficeContext.Provider>;
}
