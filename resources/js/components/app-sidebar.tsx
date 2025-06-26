import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type MainNavItems } from '@/types';
import { Link } from '@inertiajs/react';
import { Component, GitCompare, HandCoins, LayoutGrid, ListCheck, ListCollapse, ListTodo, Logs, Shapes, Split, UserCog, Vault } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: MainNavItems[] = [
    {
        role: 'Administrator',
        navGroup: [
            {
                title: 'Platform',
                items: [
                    {
                        title: 'Dashboard',
                        href: 'dashboard',
                        icon: LayoutGrid,
                    },
                    {
                        title: 'Accounts',
                        href: 'administrator.accounts.index',
                        icon: UserCog,
                    },
                    {
                        title: 'Divisions',
                        href: 'administrator.divisions.index',
                        icon: Split,
                    },
                    {
                        title: 'Sections',
                        href: 'administrator.sections.index',
                        icon: Vault,
                    },
                ],
            },
            {
                title: 'Configuration',
                items: [
                    {
                        title: 'Allotment Classes',
                        href: 'administrator.allotment-classes.index',
                        icon: Shapes,
                    },
                    {
                        title: 'PAP Types',
                        href: 'administrator.pap-types.index',
                        icon: Component,
                    },
                    {
                        title: 'Appropriations',
                        href: 'administrator.appropriations.index',
                        icon: GitCompare,
                    },
                    {
                        title: 'Appropriation Types',
                        href: 'administrator.appropriation-types.index',
                        icon: ListCheck,
                    },
                ],
            },
        ],
    },
    {
        role: 'Budget',
        navGroup: [
            {
                title: 'Platform',
                items: [
                    {
                        title: 'Dashboard',
                        href: 'budget.dashboard.index',
                        icon: LayoutGrid,
                    },
                ],
            },
            {
                title: 'Configuration',
                items: [
                    {
                        title: 'Line Items',
                        href: 'budget.line-items.index',
                        icon: ListTodo,
                    },
                    {
                        title: 'Expenditures',
                        href: 'budget.expenditures.index',
                        icon: HandCoins,
                    },
                    {
                        title: 'Programs',
                        href: 'budget.programs.index',
                        icon: Logs,
                    },
                    {
                        title: 'Subprograms',
                        href: 'budget.subprograms.index',
                        icon: ListCollapse,
                    },
                ],
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
