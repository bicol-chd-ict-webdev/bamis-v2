import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type ModalProps = {
    openModal: boolean;
    closeModal: () => void;
};

export interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    role: string;
    designation: string;
    avatar?: string;
    email_verified_at?: string | null;
    two_factor_enabled?: boolean;
}

export interface Role {
    id: number;
    name: string;
    guard_role: string;
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
    code: string;
    division_id: number;
    division_name?: string;
    wfp_codes: { id: number; wfp_code: string }[];
}

export interface LineItem {
    id: number;
    name: string;
    acronym: string;
    code: string;
}

export interface AllotmentClass {
    id: number;
    name: string;
    acronym: string;
    code: string;
    expenditures_count?: number;
    allocations_count?: number;
}

export interface Expenditure {
    id: number;
    name: string;
    code: string;
    allotment_class_id: number;
    allotment_class_name?: string;
    obligations_count?: number;
}

export interface ProgramClassification {
    id: number;
    name: string;
    code: string;
}

export interface ProjectType {
    id: number;
    name: string;
    code: string;
}

export interface Program {
    id: number;
    name: string;
    appropriation_source: string;
    code: string;
    program_classification_id?: number;
    program_classification_name?: string;
}

export interface Subprogram {
    id: number;
    name: string;
    program_id: number;
    code: string;
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
    code: string;
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
    appropriation_source: string;
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
    disbursements_sum_amount?: number;
    obligations_sum_amount?: number;
    office_allotments_count?: number;
    object_distributions_count?: number;
    unobligated_balance?: string;
    appropriation_name?: string;
    appropriation_type_name?: string;
    allotment_class_name?: string;
    program_classification?: string;
    program_name?: string;
    subprogram_name?: string;
    project_type_name?: string;
    line_item_name?: string;
}

export interface ObjectDistribution {
    id: number;
    allocation_id: number;
    expenditure_id: number;
    amount: string;
    expenditure_name?: string;
    expenditure_code?: string;
    obligations_count?: number;
}

export interface Report {
    id: number;
    date: string;
    filename: string;
    type: string;
    status: QueueStatusEnum;
    error?: string;
    expires_at: string;
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
    wfp_code?: string;
    section?: Section;
}

export interface Obligation {
    id: number;
    object_distribution_id: number;
    office_allotment_id: number;
    amount: string;
    date: string;
    creditor: string;
    particulars: string;
    is_cancelled: boolean;
    is_transferred: boolean;
    recipient: string;
    norsa_type: string;
    reference_number: string;
    dtrak_number: string;
    series: string;
    tagged_obligation_id?: string;
    oras_number_reference: string;
    allocation_id: number;
    /*tagged_obligations: { data: Obligation[] };*/
    related_obligation: { data: Obligation[] };
    offices: {
        office_allotment_id: number;
        section_id: number;
        amount: string;
    }[];
    disbursements_sum_amount?: number;
    disbursements?: { data: Disbursement[] };
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
    total_amount?: string;
}

export interface Due {
    id: number;
    amount: string;
    obligation_id: number;
}

export interface RecipientEnum {
    name: string;
    value: string;
}

export interface NorsaTypeEnum {
    name: string;
    value: string;
}

export interface AppropriationSourceEnum {
    name: string;
    value: string;
}

export interface QueueStatusEnum {
    name: string;
    value: string;
}
