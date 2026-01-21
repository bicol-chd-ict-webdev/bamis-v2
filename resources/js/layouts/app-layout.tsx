import { LoadingProvider } from '@/contexts/loading-context';
import { SearchProvider } from '@/contexts/search-context';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { JSX, type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    header?: ReactNode;
}

export default ({ children, breadcrumbs, header, ...props }: AppLayoutProps): JSX.Element => (
    <LoadingProvider>
        <SearchProvider>
            <Toaster position="bottom-center" />
            <AppLayoutTemplate breadcrumbs={breadcrumbs} header={header} {...props}>
                {children}
            </AppLayoutTemplate>
        </SearchProvider>
    </LoadingProvider>
);
