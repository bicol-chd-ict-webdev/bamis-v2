import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type MainNavItems } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user?: {
            role?: string;
        };
    };
    [key: string]: unknown;
}

export function NavMain({ items = [] }: { items: MainNavItems[] }) {
    const { props } = usePage<PageProps>();
    const userRole = props.auth?.user?.role;

    const navConfig = items.find((item) => item.role === userRole);

    if (!navConfig) return null;

    return (
        <SidebarGroup className="px-2 py-0">
            {navConfig.navGroup.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-2">
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((navItem) => (
                            <SidebarMenuItem key={navItem.title}>
                                <SidebarMenuButton asChild isActive={window.location.pathname === navItem.href}>
                                    <Link href={navItem.href} prefetch>
                                        {navItem.icon && <navItem.icon className="mr-2" />}
                                        <span>{navItem.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </div>
            ))}
        </SidebarGroup>
    );
}
