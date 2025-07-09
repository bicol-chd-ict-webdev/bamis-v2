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
};

export type SectionFormData = {
    name: string;
    acronym: string;
    code: string;
    division_id: string | number;
};

export type AllotmentClassFormData = {
    name: string;
    acronym: string;
    code: string;
};

export type ExpenditureFormData = {
    name: string;
    code: string | number;
    allotment_class_id: string | number;
};

export type ProjectTypeFormData = {
    name: string;
    code: string | number;
};

export interface ProgramFormData {
    name: string;
    appropriation_source: string;
    code?: string | number;
    program_classification?: string;
}

export interface SubprogramFormData {
    name: string;
    program_id: string | number;
}

export interface AppropriationFormData {
    name: string;
    acronym: string;
}

export interface AppropriationTypeFormData {
    name: string;
    acronym: string;
    code: number | string;
}

export interface AllocationFormData {
    appropriation_source: string;
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

export interface ObjectDistributionFormData {
    allocation_id: string;
    expenditure_id: string;
    amount: string;
}

export interface OfficeAllotmentFormData {
    allocation_id: string;
    section_id: string;
    amount: string;
}

export interface ObligationFormData {
    allocation_id: string;
    object_distribution_id: string;
    office_allotment_id: string;
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
