import type { LineItem } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface LineItemContextProps {
    lineItems: LineItem[];
}

const LineItemContext: Context<LineItemContextProps | null> = createContext<LineItemContextProps | null>(null);

export const useLineItemContext = (): LineItemContextProps => {
    const context: LineItemContextProps | null = useContext(LineItemContext);
    if (!context) throw new Error('useLineItemContext must be used inside LineItemProvider!');
    return context;
};

export function LineItemProvider({ children, value }: { children: ReactNode; value: LineItemContextProps }): JSX.Element {
    return <LineItemContext.Provider value={value}>{children}</LineItemContext.Provider>;
}
