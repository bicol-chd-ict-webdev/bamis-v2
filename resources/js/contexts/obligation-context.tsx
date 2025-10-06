import { type Allocation, type NorsaType, type ObjectDistribution, type Obligation, type OfficeAllotment, type Recipient, Section } from '@/types';
import { createContext, useContext } from 'react';

interface ObligationContextProps {
    allocation: Allocation;
    obligations: Obligation[];
    objectDistributions: ObjectDistribution[];
    officeAllotments: OfficeAllotment[];
    officeAllotmentWithObligationsCount: [];
    objectDistributionsWithObligationsCount: [];
    norsaTypes: NorsaType[];
    recipients: Recipient[];
    sections: Section[];
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
