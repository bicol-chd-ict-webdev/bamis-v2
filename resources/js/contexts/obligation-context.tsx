import type { Obligation, RecipientEnum } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface ObligationContextProps {
    obligations: Obligation[];
    recipients: RecipientEnum[];
}

const ObligationContext: Context<ObligationContextProps | null> = createContext<ObligationContextProps | null>(null);

export const useObligationContext = (): ObligationContextProps => {
    const context: ObligationContextProps | null = useContext(ObligationContext);
    if (!context) throw new Error('useObligationContext must be used inside ObligationProvider!');
    return context;
};

export function ObligationProvider({ children, value }: { children: ReactNode; value: ObligationContextProps }): JSX.Element {
    return <ObligationContext.Provider value={value}>{children}</ObligationContext.Provider>;
}
