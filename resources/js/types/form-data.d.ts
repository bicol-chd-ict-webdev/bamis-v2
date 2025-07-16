export type AccountFormData = {
    name: string;
    email: string;
    designation: string;
    role: string;
    status: string;
};

export type DivisionFormData = {
    name: string;
    acronym: string;
    sections_count?: number;
};

export type SectionFormData = {
    name: string;
    acronym: string;
    code: string;
    division_id: number;
    division_name?: string;
};

export type AllotmentClassFormData = {
    name: string;
    acronym: string;
    code: string;
};

export type ExpenditureFormData = {
    name: string;
    code: number;
    allotment_class_id: number;
    allotment_class_name?: string;
};

export interface ProgramClassificationFormData {
    name: string;
    code: number;
}

export type ProjectTypeFormData = {
    name: string;
    code: number;
};

export interface ProgramFormData {
    name: string;
    appropriation_source: string;
    code: number;
    program_classification_id?: number;
    program_classification_name?: string;
}

export interface SubprogramFormData {
    name: string;
    program_id: number;
    code: number;
}

export interface AppropriationFormData {
    name: string;
    acronym: string;
}

export interface AppropriationTypeFormData {
    name: string;
    acronym: string;
    code: number;
}

export interface AllocationFormData {
    appropriation_source: string;
    amount: string;
    date_received: string;
    line_item_id: number;
    appropriation_id: number;
    appropriation_type_id: number;
    allotment_class_id: number;
    project_type_id?: number;
    program_classification?: string;
    program_id?: number;
    subprogram_id?: number;
    remarks?: string;
    particulars?: string;
    additional_code?: string;
    saa_number?: string;
    department_order?: string;
    saro_number?: string;
}

export interface ObjectDistributionFormData {
    allocation_id: number;
    expenditure_id: number;
    amount: string;
}

export interface OfficeAllotmentFormData {
    allocation_id: number;
    section_id: number;
    amount: string;
}

export interface ObligationFormData {
    allocation_id: string;
    object_distribution_id: number;
    office_allotment_id: number;
    amount: string;
    date: string;
    creditor: string;
    particulars: string;
    is_transferred: boolean;
    recipient: string;
    is_batch_process: boolean;
    norsa_type: string;
    reference_number: string;
    dtrak_number: string;
}

export interface DisbursementFormData {
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
