import type { ObjectDistribution } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface ObjectDistributionContextProps {
    objectDistributions: ObjectDistribution[];
}

const ObjectDistributionContext: Context<ObjectDistributionContextProps | null> = createContext<ObjectDistributionContextProps | null>(null);

export const useObjectDistributionContext = (): ObjectDistributionContextProps => {
    const context: ObjectDistributionContextProps | null = useContext(ObjectDistributionContext);
    if (!context) throw new Error('useObjectDistributionContext must be used inside ObjectDistributionProvider!');
    return context;
};

export function ObjectDistributionProvider({ children, value }: { children: ReactNode; value: ObjectDistributionContextProps }): JSX.Element {
    return <ObjectDistributionContext.Provider value={value}>{children}</ObjectDistributionContext.Provider>;
}
