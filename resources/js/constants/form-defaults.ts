import {
    Allocation,
    AllotmentClass,
    Appropriation,
    AppropriationType,
    Disbursement,
    Division,
    Expenditure,
    LineItem,
    ObjectDistribution,
    Obligation,
    OfficeAllotment,
    Program,
    ProgramClassification,
    ProjectType,
    Section,
    Subprogram,
    User,
} from '@/types';

export const USER_FORM_DEFAULTS: User = {
    id: 0,
    name: '',
    email: '',
    role: '',
    designation: '',
    status: 'active',
};

export const DIVISION_FORM_DEFAULTS: Division = {
    id: 0,
    name: '',
    acronym: '',
};

export const SECTION_FORM_DEFAULTS: Section = {
    id: 0,
    name: '',
    acronym: '',
    code: '',
    division_id: 0,
    wfp_codes: [
        {
            id: 0,
            wfp_code: '',
        },
    ],
};

export const ALLOTMENT_CLASS_FORM_DEFAULTS: AllotmentClass = {
    id: 0,
    name: '',
    acronym: '',
    code: '',
};

export const PROJECT_TYPE_FORM_DEFAULTS: ProjectType = {
    id: 0,
    name: '',
    code: '',
};

export const APPROPRIATION_FORM_DEFAULTS: Appropriation = {
    id: 0,
    name: '',
    acronym: '',
};

export const APPROPRIATION_TYPE_FORM_DEFAULTS: AppropriationType = {
    id: 0,
    name: '',
    acronym: '',
    code: '',
};

export const PROGRAM_CLASSIFICATION_FORM_DEFAULTS: ProgramClassification = {
    id: 0,
    name: '',
    code: '',
};

export const LINE_ITEM_FORM_DEFAULTS: LineItem = {
    id: 0,
    name: '',
    acronym: '',
    code: '',
};

export const EXPENDITURE_FORM_DEFAULTS: Expenditure = {
    id: 0,
    name: '',
    code: '',
    allotment_class_id: 0,
};

export const PROGRAM_FORM_DEFAULTS: Program = {
    id: 0,
    name: '',
    appropriation_source: '',
    program_classification_id: 0,
    code: '',
};

export const SUBPROGRAM_FORM_DEFAULTS: Subprogram = {
    id: 0,
    name: '',
    program_id: 0,
    code: '',
};

export const GENERAL_APPROPRIATION_FORM_DEFAULTS: Allocation = {
    id: 0,
    appropriation_source: '',
    amount: '',
    date_received: new Date().toISOString().split('T')[0],
    line_item_id: 0,
    appropriation_id: 1,
    appropriation_type_id: 0,
    allotment_class_id: 0,
    project_type_id: 0,
    program_classification_id: 0,
    program_id: 0,
    subprogram_id: 0,
    remarks: '',
};

export const SUB_ALLOTMENT_FORM_DEFAULTS: Allocation = {
    id: 0,
    appropriation_source: '',
    amount: '',
    date_received: new Date().toISOString().split('T')[0],
    line_item_id: 0,
    appropriation_id: 2,
    appropriation_type_id: 0,
    allotment_class_id: 0,
    project_type_id: 0,
    program_classification_id: 0,
    program_id: 0,
    subprogram_id: 0,
    remarks: '',
    particulars: '',
    saa_number: '',
    department_order: '',
};

export const SPECIAL_ALLOTMENT_FORM_DEFAULTS: Allocation = {
    id: 0,
    appropriation_source: '',
    amount: '',
    date_received: new Date().toISOString().split('T')[0],
    line_item_id: 0,
    appropriation_id: 3,
    appropriation_type_id: 0,
    allotment_class_id: 0,
    project_type_id: 0,
    program_classification_id: 0,
    program_id: 0,
    subprogram_id: 0,
    remarks: '',
    saro_number: '',
};

export const OFFICE_ALLOTMENT_FORM_DEFAULTS = (allocationId: number): OfficeAllotment => ({
    id: 0,
    allocation_id: allocationId,
    section_id: 0,
    amount: '',
    wfp_suffix_code: '',
});

export const OBJECT_DISTRIBUTION_FORM_DEFAULTS = (allocationId: number): ObjectDistribution => ({
    id: 0,
    allocation_id: allocationId,
    expenditure_id: 0,
    amount: '',
});

export const OBLIGATION_FORM_DEFAULTS = (allocationId: number): Obligation => ({
    id: 0,
    allocation_id: allocationId,
    object_distribution_id: 0,
    office_allotment_id: 0,
    amount: '',
    date: new Date().toISOString().split('T')[0],
    creditor: '',
    particulars: '',
    is_cancelled: false,
    is_transferred: false,
    recipient: '',
    norsa_type: '',
    reference_number: '',
    dtrak_number: '',
    series: '',
    tagged_obligation_id: undefined,
    oras_number_reference: '',
    related_obligation: { data: [] },
    offices: [{ office_allotment_id: 0, section_id: 0, amount: '' }],
});

export const DISBURSEMENT_FORM_DEFAULTS = (obligationId: number): Disbursement => ({
    id: 0,
    net_amount: '',
    date: new Date().toISOString().split('T')[0],
    obligation_id: Number(obligationId),
    tax: '',
    retention: '',
    penalty: '',
    absences: '',
    other_deductions: '',
    check_date: '',
    check_number: '',
    remarks: '',
});
