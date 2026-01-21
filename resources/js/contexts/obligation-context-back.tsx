import type { Allocation, NorsaTypeEnum, ObjectDistribution, Obligation, OfficeAllotment, RecipientEnum, Section } from '@/types';
import { createContext, useContext } from 'react';

interface ObligationContextProps {
    allocation: Allocation;
    obligations: Obligation[];
    objectDistributions: ObjectDistribution[];
    officeAllotments: OfficeAllotment[];
    officeAllotmentWithObligationsCount: [];
    objectDistributionsWithObligationsCount: [];
    norsaTypes: NorsaTypeEnum[];
    recipients: RecipientEnum[];
    sections: Section[];
}

const ObligationContextBack = createContext<ObligationContextProps | null>(null);

export const useObligationContext = () => {
    const context = useContext(ObligationContextBack);
    if (!context) throw new Error('Obligation context not found');
    return context;
};

export const ObligationProvider = ({ children, value }: { children: React.ReactNode; value: ObligationContextProps }) => (
    <ObligationContextBack.Provider value={value}>{children}</ObligationContextBack.Provider>
);
