import type { OfficeAllotment } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface OfficeAllotmentContextProps {
    officeAllotments: OfficeAllotment[];
}

const OfficeAllotmentContext: Context<OfficeAllotmentContextProps | null> = createContext<OfficeAllotmentContextProps | null>(null);

export const useOfficeAllotmentContext = (): OfficeAllotmentContextProps => {
    const context: OfficeAllotmentContextProps | null = useContext(OfficeAllotmentContext);
    if (!context) throw new Error('useOfficeAllotmentContext must be used inside OfficeAllotmentProvider!');
    return context;
};

export function OfficeAllotmentProvider({ children, value }: { children: ReactNode; value: OfficeAllotmentContextProps }): JSX.Element {
    return <OfficeAllotmentContext.Provider value={value}>{children}</OfficeAllotmentContext.Provider>;
}
