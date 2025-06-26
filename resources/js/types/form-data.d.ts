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

export type PapTypeFormData = {
    name: string;
    code: string | number;
};

export interface ProgramFormData {
    name: string;
    appropriation_source: string;
    code?: string | number;
    prexc?: string;
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
