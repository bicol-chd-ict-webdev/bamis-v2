import { type Program } from '@/types';
import { createContext, useContext } from 'react';

interface SubprogramContextProps {
    programs: Program[];
}

const SubprogramContext = createContext<SubprogramContextProps | null>(null);

export const useSubprogramContext = () => {
    const context = useContext(SubprogramContext);
    if (!context) throw new Error('Subprogram context not found');
    return context;
};

export const SubprogramProvider = ({ children, value }: { children: React.ReactNode; value: SubprogramContextProps }) => (
    <SubprogramContext.Provider value={value}>{children}</SubprogramContext.Provider>
);
