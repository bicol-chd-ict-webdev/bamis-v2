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
    sections_count?: number;
}

export interface Section {
    id: number;
    name: string;
    acronym: string;
    division_id: number;
    division_name?: string;
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
    allocations_count?: number;
}

export interface Expenditure {
    id: number;
    name: string;
    code: number;
    allotment_class_id: number;
    allotment_class_name?: string;
    obligations_count?: number;
}

export interface ProgramClassification {
    id: number;
    name: string;
    code: number;
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
    code: number;
    program_classification_id?: number;
    program_classification_name?: string;
}

export interface Subprogram {
    id: number;
    name: string;
    program_id: number;
    code: number;
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
    allocations_count?: number;
}

export interface Allocation {
    id: number;
    amount: string;
    date_received: string;
    line_item_id: number;
    appropriation_id: number;
    appropriation_type_id: number;
    allotment_class_id: number;
    project_type_id?: number;
    program_classification_id?: number;
    program_classification_name?: string;
    program_id?: number;
    subprogram_id?: number;
    remarks?: string;
    particulars?: string;
    saa_number?: string;
    department_order?: string;
    saro_number?: string;
    obligations_sum_amount?: number;
    office_allotments_count?: number;
    object_distributions_count?: number;
    unobligated_balance?: string;
}

export interface ObjectDistribution {
    id: number;
    allocation_id: number;
    expenditure_id: number;
    amount: string;
    expenditure_name?: string;
    obligations_count?: number;
}

export interface OfficeAllotment {
    id: number;
    allocation_id: number;
    section_id: number;
    amount: string;
    wfp_suffix_code: string;
    section_name?: string;
    section_acronym?: string;
    obligations_count?: number;
}

export interface Obligation {
    id: number;
    object_distribution_id: number;
    office_allotment_id: number;
    amount: string;
    date: string;
    creditor: string;
    expenditure_id?: number;
    particulars: string;
    is_cancelled: boolean,
    is_transferred: boolean;
    recipient: string;
    norsa_type: string;
    reference_number: string;
    dtrak_number: string;
    series: string;
    tagged_obligation_id?: string,
    oras_number_reference: string;
    tagged_obligations: [],
    related_obligation: [],
}

export interface Disbursement {
    id: number;
    net_amount: string;
    date: string;
    obligation_id: number;
    tax?: string;
    retention?: string;
    penalty?: string;
    absences?: string;
    other_deductions?: string;
    check_date?: string;
    check_number?: string;
    remarks?: string;
}

export interface Due {
    id: number;
    amount: string;
    obligation_id: number;
}

export interface Recipient {
    name: string;
    value: string;
}

export interface NorsaType {
    name: string;
    value: string;
}

export interface ProgramClassification {
    name: string;
    value: string;
}

export interface AppropriationSource {
    name: string;
    value: string;
}
