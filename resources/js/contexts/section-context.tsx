import { type Section } from '@/types';
import { createContext, useContext } from 'react';

interface SectionContextProps {
    sections: Section[];
}

const SectionContext = createContext<SectionContextProps | null>(null);

export const useSectionContext = () => {
    const context = useContext(SectionContext);
    if (!context) throw new Error('Section context not found');
    return context;
};

export const SectionProvider = ({ children, value }: { children: React.ReactNode; value: SectionContextProps }) => (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
);
