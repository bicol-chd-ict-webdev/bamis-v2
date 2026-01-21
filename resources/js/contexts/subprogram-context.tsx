import type { Subprogram } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface SubprogramContextProps {
    subprograms: Subprogram[];
}

const SubprogramContext: Context<SubprogramContextProps | null> = createContext<SubprogramContextProps | null>(null);

export const useSubprogramContext = (): SubprogramContextProps => {
    const context: SubprogramContextProps | null = useContext(SubprogramContext);
    if (!context) throw new Error('useSubprogramContext must be used inside SubprogramProvider!');
    return context;
};

export const SubprogramProvider = ({ children, value }: { children: ReactNode; value: SubprogramContextProps }): JSX.Element => (
    <SubprogramContext.Provider value={value}>{children}</SubprogramContext.Provider>
);
