import type { ProjectType } from '@/types';
import { Context, createContext, JSX, ReactNode, useContext } from 'react';

interface ProjectTypeContextProps {
    projectTypes: ProjectType[];
}

const ProjectTypeContext: Context<ProjectTypeContextProps | null> = createContext<ProjectTypeContextProps | null>(null);

export const useProjectTypeContext = (): ProjectTypeContextProps => {
    const context: ProjectTypeContextProps | null = useContext(ProjectTypeContext);
    if (!context) throw new Error('useProjectTypeContext must be used inside ProjectTypeProvider!');
    return context;
};

export function ProjectTypeProvider({ children, value }: { children: ReactNode; value: ProjectTypeContextProps }): JSX.Element {
    return <ProjectTypeContext.Provider value={value}>{children}</ProjectTypeContext.Provider>;
}
