import type { Section } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface SectionContextProps {
    sections: Section[];
}

const SectionContext: Context<SectionContextProps | null> = createContext<SectionContextProps | null>(null);

export const useSectionContext = (): SectionContextProps => {
    const context: SectionContextProps | null = useContext(SectionContext);
    if (!context) throw new Error('useSectionContext must be used inside SectionProvider!');
    return context;
};

export function SectionProvider({ children, value }: { children: ReactNode; value: SectionContextProps }): JSX.Element {
    return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
}
