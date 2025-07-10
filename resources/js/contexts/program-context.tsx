import { type AppropriationSource, type ProgramClassification } from '@/types';
import { createContext, useContext } from 'react';

interface ProgramContextProps {
    appropriationSources: AppropriationSource[];
    programClassifications: ProgramClassification[];
}

const ProgramContext = createContext<ProgramContextProps | null>(null);

export const useProgramContext = () => {
    const context = useContext(ProgramContext);
    if (!context) throw new Error('Program context not found');
    return context;
};

export const ProgramProvider = ({ children, value }: { children: React.ReactNode; value: ProgramContextProps }) => (
    <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
);
