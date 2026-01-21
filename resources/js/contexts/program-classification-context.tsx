import type { ProgramClassification } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface ProgramClassificationContextProps {
    programClassifications: ProgramClassification[];
}

const ProgramClassificationContext: Context<ProgramClassificationContextProps | null> = createContext<ProgramClassificationContextProps | null>(null);

export const useProgramClassificationContext = (): ProgramClassificationContextProps => {
    const context: ProgramClassificationContextProps | null = useContext(ProgramClassificationContext);
    if (!context) throw new Error('useProgramClassificationContext must be used inside ProgramClassificationProvider!');
    return context;
};

export function ProgramClassificationProvider({ children, value }: { children: ReactNode; value: ProgramClassificationContextProps }): JSX.Element {
    return <ProgramClassificationContext.Provider value={value}>{children}</ProgramClassificationContext.Provider>;
}
