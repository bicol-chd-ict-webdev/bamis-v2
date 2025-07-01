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

interface GeneralAppropriationContextProps {
    lineItems: LineItem[];
    allotmentClasses: AllotmentClass[];
    appropriationTypes: AppropriationType[];
    projectTypes?: ProjectType[];
    programClassifications?: ProgramClassification[];
    programs?: Program[];
    subprograms?: Subprogram[];
    appropriationSources: AppropriationSource[];
}

const GeneralAppropriationContext = createContext<GeneralAppropriationContextProps | null>(null);

export const useGeneralAppropriationContext = () => {
    const context = useContext(GeneralAppropriationContext);
    if (!context) throw new Error('GeneralAppropriationContext not found');
    return context;
};

export const GeneralAppropriationProvider = ({ children, value }: { children: React.ReactNode; value: GeneralAppropriationContextProps }) => (
    <GeneralAppropriationContext.Provider value={value}>{children}</GeneralAppropriationContext.Provider>
);
