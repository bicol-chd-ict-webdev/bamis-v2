import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type UserRole = 'Administrator' | 'Budget';

export interface User {
    id: number;
    name: string;
    email: string;
    role?: UserRole;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface MainNavItems {
    role: UserRole;
    navGroup: NavGroup[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Account {
    id: number;
    name: string;
    email: string;
    designation: string;
    role: string;
    [key: string]: string | number;
}

export interface Division {
    id: number;
    name: string;
    acronym: string;
}

export interface Section {
    id: number;
    name: string;
    acronym: string;
    division_id: number;
    [key: string]: string | number;
}

export interface LineItem {
    id: number;
    name: string;
    acronym: string;
    code: number;
}
