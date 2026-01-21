import type { Program } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface ProgramContextProps {
    programs: Program[];
}

const ProgramContext: Context<ProgramContextProps | null> = createContext<ProgramContextProps | null>(null);

export const useProgramContext = (): ProgramContextProps => {
    const context: ProgramContextProps | null = useContext(ProgramContext);
    if (!context) throw new Error('useProgramContext must be used inside ProgramProvider!');
    return context;
};

export const ProgramProvider = ({ children, value }: { children: ReactNode; value: ProgramContextProps }): JSX.Element => (
    <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
);
