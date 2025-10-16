import {
    type AllotmentClass,
    type AppropriationSource,
    type AppropriationType,
    type LineItem,
    type Program,
    type ProgramClassification,
    type ProjectType,
    type Subprogram,
} from '@/types';
import { createContext, useContext } from 'react';

interface AllocationContextProps {
    lineItems: LineItem[];
    allotmentClasses: AllotmentClass[];
    appropriationTypes: AppropriationType[];
    projectTypes?: ProjectType[];
    programClassifications?: ProgramClassification[];
    programs?: Program[];
    subprograms?: Subprogram[];
    appropriationSources: AppropriationSource[];
}

const AllocationContext = createContext<AllocationContextProps | null>(null);

export const useAllocationContext = () => {
    const context = useContext(AllocationContext);
    if (!context) throw new Error('AllocationContext not found');
    return context;
};

export const AllocationProvider = ({ children, value }: { children: React.ReactNode; value: AllocationContextProps }) => (
    <AllocationContext.Provider value={value}>{children}</AllocationContext.Provider>
);
