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
