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
    [key: string]: string | number;
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

export interface AllotmentClass {
    id: number;
    name: string;
    acronym: string;
    code: number;
    expenditures_count?: number;
}

export interface Expenditure {
    id: number;
    name: string;
    code: number;
    allotment_class_id: number;
    [key: string]: string | number;
}

export interface ProjectType {
    id: number;
    name: string;
    code: number;
}

export interface Program {
    id: number;
    name: string;
    appropriation_source: string;
    code?: number;
    program_classification?: string;
}

export interface Subprogram {
    id: number;
    name: string;
    program_id: number;
}

export interface Appropriation {
    id: number;
    name: string;
    acronym: string;
}

export interface AppropriationType {
    id: number;
    name: string;
    acronym: string;
    code: number;
}

export interface Allocation {
    id: number;
    amount: string;
    date_received: string;
    line_item_id: string;
    appropriation_id: string;
    appropriation_type_id: string;
    allotment_class_id: string;
    project_type_id?: string;
    program_classification?: string;
    program_id?: string;
    subprogram_id?: string;
    remarks?: string;
    particulars?: string;
    additional_code?: string;
    saa_number?: string;
    department_order?: string;
    saro_number?: string;
}

export interface ProgramClassification {
    name: string;
    value: string;
}

export interface AppropriationSource {
    name: string;
    value: string;
}
