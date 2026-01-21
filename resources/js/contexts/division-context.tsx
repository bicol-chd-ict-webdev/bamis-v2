import type { Division } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface DivisionContextProps {
    divisions: Division[];
}

const DivisionContext: Context<DivisionContextProps | null> = createContext<DivisionContextProps | null>(null);

export const useDivisionContext = (): DivisionContextProps => {
    const context: DivisionContextProps | null = useContext(DivisionContext);
    if (!context) throw new Error('useDivisionContext must be used inside DivisionProvider!');
    return context;
};

export function DivisionProvider({ children, value }: { children: ReactNode; value: DivisionContextProps }): JSX.Element {
    return <DivisionContext.Provider value={value}>{children}</DivisionContext.Provider>;
}
