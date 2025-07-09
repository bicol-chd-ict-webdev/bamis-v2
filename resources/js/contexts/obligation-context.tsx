import { type Allocation, type NorsaType, type ObjectDistribution, type Obligation, type OfficeAllotment, type Recipient } from '@/types';
import { createContext, useContext } from 'react';

interface ObligationContextProps {
    allocation: Allocation;
    obligations: Obligation[];
    objectDistributions: ObjectDistribution[];
    officeAllotments: OfficeAllotment[];
    norsaTypes: NorsaType[];
    recipients: Recipient[];
}

const ObligationContext = createContext<ObligationContextProps | null>(null);

export const useObligationContext = () => {
    const context = useContext(ObligationContext);
    if (!context) throw new Error('Obligation context not found');
    return context;
};

export const ObligationProvider = ({ children, value }: { children: React.ReactNode; value: ObligationContextProps }) => (
    <ObligationContext.Provider value={value}>{children}</ObligationContext.Provider>
);
