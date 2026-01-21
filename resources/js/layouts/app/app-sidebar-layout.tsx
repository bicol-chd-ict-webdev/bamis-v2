import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { JSX, type PropsWithChildren, type ReactNode } from 'react';

interface AppSidebarLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
    header?: ReactNode;
}

export default function AppSidebarLayout({ children, breadcrumbs, header }: AppSidebarLayoutProps): JSX.Element {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} header={header} />
                {children}
            </AppContent>
        </AppShell>
    );
}
