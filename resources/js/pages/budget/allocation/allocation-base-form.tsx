import Combobox from '@/components/combobox';
import { DatePicker } from '@/components/date-picker';
import { MoneyInput } from '@/components/money-input';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAllocationContext } from '@/contexts/allocation-context';
import { useAllotmentClassContext } from '@/contexts/allotment-class-context';
import { useAppropriationTypeContext } from '@/contexts/appropriation-type-context';
import { useLineItemContext } from '@/contexts/line-item-context';
import { useModalContext } from '@/contexts/modal-context';
import { useProgramClassificationContext } from '@/contexts/program-classification-context';
import { useProgramContext } from '@/contexts/program-context';
import { useProjectTypeContext } from '@/contexts/project-type-context';
import { useSubprogramContext } from '@/contexts/subprogram-context';
import { cn } from '@/lib/utils';
import type {
    Allocation,
    AllotmentClass,
    AppropriationSourceEnum,
    AppropriationType,
    Program,
    ProgramClassification,
    ProjectType,
    Subprogram,
} from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { ChangeEvent, JSX, useEffect, useMemo } from 'react';

const AllocationBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Allocation>();
    const { lineItems } = useLineItemContext();
    const { appropriationTypes } = useAppropriationTypeContext();
    const { allotmentClasses } = useAllotmentClassContext();
    const { projectTypes } = useProjectTypeContext();
    const { programClassifications } = useProgramClassificationContext();
    const { programs } = useProgramContext();
    const { subprograms } = useSubprogramContext();
    const { appropriationSources } = useAllocationContext();

    const filteredSubprograms: Subprogram[] = useMemo((): Subprogram[] => {
        if (!formHandler.data.program_id || !subprograms) return [];
        return subprograms.filter((subprogram: Subprogram): boolean => subprogram.program_id === Number(formHandler.data.program_id));
    }, [subprograms, formHandler.data.program_id]);

    const filteredPrograms: Program[] = useMemo((): Program[] => {
        if (!formHandler.data.appropriation_source || !programs) return [];
        return programs.filter((program: Program): boolean => program.appropriation_source === formHandler.data.appropriation_source);
    }, [programs, formHandler.data.appropriation_source]);

    const filteredAllotmentClasses: AllotmentClass[] = useMemo((): AllotmentClass[] => {
        if (Number(formHandler.data.appropriation_type_id) === 2) {
            return allotmentClasses.filter((allotmentClass: AllotmentClass): boolean => allotmentClass.id !== 1);
        }
        return allotmentClasses;
    }, [formHandler.data.appropriation_type_id, allotmentClasses]);

    useEffect((): void => {
        if (formHandler.data.appropriation_source === 'II. Automatic Appropriations') {
            if (Number(formHandler.data.program_id) !== 11) {
                formHandler.setData('program_id', 11);
            }
        } else {
            const currentProgramId: number = Number(formHandler.data.program_id);
            const isStillValid: boolean = filteredPrograms.some((program: Program): boolean => program.id === currentProgramId);
            if (!isStillValid) {
                formHandler.setData('program_id', 0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formHandler.data.appropriation_source, filteredPrograms]);

    useEffect((): void => {
        const currentSubprogramId: number = Number(formHandler.data.subprogram_id);
        const stillValid: boolean = filteredSubprograms.some((subprogram: Subprogram): boolean => subprogram.id === currentSubprogramId);
        if (!stillValid) {
            formHandler.setData('subprogram_id', 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredSubprograms]);

    useEffect((): void => {
        if (formHandler.data.project_type_id !== 3 && formHandler.data.program_classification_id !== 0) {
            formHandler.setData('program_classification_id', 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formHandler.data.project_type_id]);

    useEffect((): void => {
        if (formHandler.data.appropriation_source !== 'I. New Appropriation') {
            formHandler.setData('project_type_id', 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formHandler.data.appropriation_source]);

    const handleLineItemChange = (selectedLineItem: number): void => {
        formHandler.setData('line_item_id', selectedLineItem);
    };

    return (
        <FieldSet className="grid grid-cols-2 divide-x divide-border">
            <FieldSet>
                <FieldGroup className="grid grid-cols-2 px-5 pt-5">
                    <Field data-invalid={!!formHandler.errors.appropriation_source}>
                        <FieldLabel htmlFor="appropriation-source">Appropriation Source</FieldLabel>
                        <Select
                            name="appropriation_source"
                            value={String(formHandler.data.appropriation_source ?? '')}
                            onValueChange={(e: string): void => {
                                formHandler.setData((prev: Allocation) => ({
                                    ...prev,
                                    appropriation_source: e,
                                    allotment_class_id: e === 'II. Automatic Appropriations' ? 1 : 0,
                                    program_classification_id: 0,
                                }));
                            }}
                        >
                            <SelectTrigger
                                id="appropriation-source"
                                aria-invalid={!!formHandler.errors.appropriation_source}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('appropriation_source')}
                            >
                                <SelectValue placeholder="Choose appropriation source" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Appropriation Sources</SelectLabel>
                                    {appropriationSources.map(
                                        (appropriationSource: AppropriationSourceEnum): JSX.Element => (
                                            <SelectItem key={appropriationSource.value} value={String(appropriationSource.value)}>
                                                {appropriationSource.value}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {formHandler.invalid('appropriation_source') && <FieldError>{formHandler.errors.appropriation_source}</FieldError>}
                    </Field>

                    <Field data-invalid={!!formHandler.errors.appropriation_type_id}>
                        <FieldLabel htmlFor="appropriation-type-id">Appropriation Type</FieldLabel>
                        <Select
                            name="appropriation_type_id"
                            value={formHandler.data.appropriation_type_id === 0 ? '' : String(formHandler.data.appropriation_type_id)}
                            onValueChange={(value: string): void => formHandler.setData('appropriation_type_id', Number(value))}
                        >
                            <SelectTrigger
                                id="appropriation-type-id"
                                aria-invalid={!!formHandler.errors.appropriation_type_id}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('appropriation_type_id')}
                            >
                                <SelectValue placeholder="Choose appropriation type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Appropriation Types</SelectLabel>
                                    {appropriationTypes.map(
                                        (appropriationType: AppropriationType): JSX.Element => (
                                            <SelectItem key={appropriationType.id} value={String(appropriationType.id)}>
                                                {appropriationType.name}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {formHandler.invalid('appropriation_type_id') && <FieldError>{formHandler.errors.appropriation_type_id}</FieldError>}
                    </Field>
                </FieldGroup>

                <FieldGroup className="grid grid-cols-2 px-5">
                    <Field data-invalid={!!formHandler.errors.project_type_id}>
                        <FieldLabel htmlFor="project-type-id">Project Type</FieldLabel>
                        <Select
                            name="project_type_id"
                            value={formHandler.data.project_type_id === 0 ? '' : String(formHandler.data.project_type_id)}
                            onValueChange={(value: string): void => formHandler.setData('project_type_id', Number(value))}
                            disabled={formHandler.data.appropriation_source !== 'I. New Appropriation'}
                        >
                            <SelectTrigger
                                id="project-type-id"
                                aria-invalid={!!formHandler.errors.project_type_id}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('project_type_id')}
                            >
                                <SelectValue placeholder="Choose project type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Project Types</SelectLabel>
                                    {projectTypes.map(
                                        (projectType: ProjectType): JSX.Element => (
                                            <SelectItem key={projectType.id} value={String(projectType.id)}>
                                                {projectType.name}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {formHandler.invalid('project_type_id') && <FieldError>{formHandler.errors.project_type_id}</FieldError>}
                    </Field>

                    <Field data-invalid={!!formHandler.errors.allotment_class_id}>
                        <FieldLabel htmlFor="allotment-class-id">Allotment Class</FieldLabel>
                        <Select
                            name="allotment_class_id"
                            value={formHandler.data.allotment_class_id === 0 ? '' : String(formHandler.data.allotment_class_id)}
                            onValueChange={(value: string): void => formHandler.setData('allotment_class_id', Number(value))}
                            disabled={formHandler.data.appropriation_source === 'II. Automatic Appropriations'}
                        >
                            <SelectTrigger
                                id="allotment-class-id"
                                aria-invalid={!!formHandler.errors.allotment_class_id}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('allotment_class_id')}
                            >
                                <SelectValue placeholder="Choose allotment class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Allotment Classes</SelectLabel>
                                    {filteredAllotmentClasses.map(
                                        (allotmentClass: AllotmentClass): JSX.Element => (
                                            <SelectItem key={allotmentClass.id} value={String(allotmentClass.id)}>
                                                {allotmentClass.name}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {formHandler.invalid('allotment_class_id') && <FieldError>{formHandler.errors.allotment_class_id}</FieldError>}
                    </Field>
                </FieldGroup>

                <FieldGroup className="px-5">
                    {formHandler.data.appropriation_id === 3 && (
                        <Field data-invalid={!!formHandler.errors.saro_number}>
                            <FieldLabel htmlFor="saro-number">SARO Number</FieldLabel>
                            <Input
                                id="saro-number"
                                name="saro_number"
                                autoComplete="off"
                                placeholder="25-0003442"
                                minLength={3}
                                maxLength={10}
                                aria-invalid={!!formHandler.errors.saro_number}
                                value={String(formHandler.data.saro_number ?? '')}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                    const value: string = e.target.value;
                                    const regex = /^[0-9-]*$/;

                                    if (regex.test(value)) {
                                        formHandler.setData('saro_number', value);
                                    }
                                }}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('saro_number')}
                            />
                            {formHandler.invalid('saro_number') && <FieldError>{formHandler.errors.saro_number}</FieldError>}
                        </Field>
                    )}

                    <Field data-invalid={!!formHandler.errors.line_item_id}>
                        <FieldLabel htmlFor="line-item-id">Line Item</FieldLabel>
                        <Combobox
                            id="line-item-id"
                            placeholder="Choose line item"
                            hasError={formHandler.errors.line_item_id}
                            selectedValue={Number(formHandler.data.line_item_id)}
                            onSelect={handleLineItemChange}
                            data={lineItems}
                            onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('line_item_id')}
                        />
                        {formHandler.invalid('line_item_id') && <FieldError>{formHandler.errors.line_item_id}</FieldError>}
                    </Field>
                </FieldGroup>

                <FieldGroup className="grid grid-cols-2 px-5">
                    <Field data-invalid={!!formHandler.errors.amount}>
                        <FieldLabel htmlFor="amount">Amount</FieldLabel>
                        <MoneyInput
                            id="amount"
                            name="amount"
                            invalid={!!formHandler.errors.amount}
                            value={String(formHandler.data.amount ?? '')}
                            onValueChange={(value: string): void => formHandler.setData('amount', String(value))}
                        />
                        {formHandler.invalid('amount') && <FieldError>{formHandler.errors.amount}</FieldError>}
                    </Field>

                    <Field data-invalid={!!formHandler.errors.date_received}>
                        <FieldLabel htmlFor="date-received">Date Received</FieldLabel>
                        <DatePicker
                            id="date-received"
                            value={String(formHandler.data.date_received)}
                            ariaInvalid={!!formHandler.errors.date_received}
                            disableDates={(date: Date): boolean => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date > today;
                            }}
                            onChange={(date: Date | undefined): void => {
                                if (date) {
                                    const formatted: string = date.toLocaleDateString('en-CA');
                                    formHandler.setData('date_received', formatted);
                                }
                            }}
                            onBlur={(): void => {
                                formHandler.validate('date_received');
                            }}
                        />
                        {formHandler.invalid('date_received') && <FieldError>{formHandler.errors.date_received}</FieldError>}
                    </Field>
                </FieldGroup>

                <FieldGroup className="px-5">
                    {formHandler.data.appropriation_id === 2 && (
                        <Field data-invalid={!!formHandler.errors.particulars}>
                            <FieldLabel htmlFor="particulars">Particulars</FieldLabel>
                            <Textarea
                                id="particulars"
                                name="particulars"
                                autoComplete="off"
                                placeholder="Particulars"
                                aria-invalid={!!formHandler.errors.particulars}
                                value={String(formHandler.data.particulars ?? '')}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => formHandler.setData('particulars', e.target.value)}
                            />
                            {formHandler.invalid('particulars') && <FieldError>{formHandler.errors.particulars}</FieldError>}
                        </Field>
                    )}
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                {formHandler.data.appropriation_id === 2 && (
                    <FieldGroup className="grid grid-cols-2 pt-5 pr-5">
                        <Field data-invalid={!!formHandler.errors.saa_number}>
                            <FieldLabel htmlFor="saa-number">SAA Number</FieldLabel>
                            <Input
                                id="saa-number"
                                name="saa_number"
                                autoComplete="off"
                                placeholder="2024-04-001648"
                                minLength={9}
                                maxLength={15}
                                aria-invalid={!!formHandler.errors.saa_number}
                                value={String(formHandler.data.saa_number ?? '')}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                    const value: string = e.target.value;
                                    const regex = /^[0-9-]*$/;

                                    if (regex.test(value)) {
                                        formHandler.setData('saa_number', value);
                                    }
                                }}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('saa_number')}
                            />
                            {formHandler.invalid('saa_number') && <FieldError>{formHandler.errors.saa_number}</FieldError>}
                        </Field>

                        <Field data-invalid={!!formHandler.errors.department_order}>
                            <FieldLabel htmlFor="department-order">Department Order</FieldLabel>
                            <Input
                                id="department-order"
                                name="department_order"
                                autoComplete="off"
                                placeholder="2025-0591"
                                minLength={5}
                                maxLength={10}
                                aria-invalid={!!formHandler.errors.department_order}
                                value={String(formHandler.data.department_order ?? '')}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                    const value: string = e.target.value;
                                    const regex = /^[0-9-]*$/;

                                    if (regex.test(value)) {
                                        formHandler.setData('department_order', value);
                                    }
                                }}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('department_order')}
                            />
                            {formHandler.invalid('department_order') && <FieldError>{formHandler.errors.department_order}</FieldError>}
                        </Field>
                    </FieldGroup>
                )}

                <FieldGroup className={cn('pr-5', formHandler.data.appropriation_id === 2 ? 'pt-0' : 'pt-5')}>
                    <Field data-invalid={!!formHandler.errors.program_classification_id}>
                        <FieldLabel htmlFor="program-classification-id">Program Classification</FieldLabel>
                        <Select
                            name="program_classification_id"
                            value={formHandler.data.program_classification_id === 0 ? '' : String(formHandler.data.program_classification_id)}
                            onValueChange={(value: string): void => formHandler.setData('program_classification_id', Number(value))}
                            disabled={String(formHandler.data.project_type_id) !== '3'}
                        >
                            <SelectTrigger
                                id="program-classification-id"
                                aria-invalid={!!formHandler.errors.program_classification_id}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('program_classification_id')}
                            >
                                <SelectValue placeholder="Choose program classification" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Program Classifications</SelectLabel>
                                    {programClassifications.map(
                                        (programClassification: ProgramClassification): JSX.Element => (
                                            <SelectItem key={programClassification.id} value={String(programClassification.id)}>
                                                {programClassification.name}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {formHandler.invalid('program_classification_id') && <FieldError>{formHandler.errors.program_classification_id}</FieldError>}
                    </Field>

                    <Field data-invalid={!!formHandler.errors.program_id}>
                        <FieldLabel htmlFor="program-id">Program</FieldLabel>
                        <Select
                            name="program_id"
                            value={formHandler.data.program_id === 0 ? '' : String(formHandler.data.program_id)}
                            onValueChange={(value: string): void => formHandler.setData('program_id', Number(value))}
                            disabled={formHandler.data.appropriation_source === 'II. Automatic Appropriations' || filteredPrograms.length < 1}
                        >
                            <SelectTrigger
                                id="program-id"
                                aria-invalid={!!formHandler.errors.program_id}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('program_id')}
                            >
                                <SelectValue placeholder="Choose program" />
                            </SelectTrigger>
                            {filteredPrograms && (
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Programs</SelectLabel>
                                        {filteredPrograms.map(
                                            (program: Program): JSX.Element => (
                                                <SelectItem key={program.id} value={String(program.id)}>
                                                    {program.name}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            )}
                        </Select>
                        {formHandler.invalid('program_id') && <FieldError>{formHandler.errors.program_id}</FieldError>}
                    </Field>

                    <Field data-invalid={!!formHandler.errors.subprogram_id}>
                        <FieldLabel htmlFor="subprogram-id">Subprogram</FieldLabel>
                        <Select
                            name="subprogram_id"
                            value={formHandler.data.subprogram_id === 0 ? '' : String(formHandler.data.subprogram_id)}
                            onValueChange={(value: string): void => formHandler.setData('subprogram_id', Number(value))}
                            disabled={filteredSubprograms.length < 1}
                        >
                            <SelectTrigger
                                id="subprogram-id"
                                aria-invalid={!!formHandler.errors.subprogram_id}
                                onBlur={(): InertiaPrecognitiveFormProps<Allocation> => formHandler.validate('subprogram_id')}
                            >
                                <SelectValue placeholder="Choose subprogram" />
                            </SelectTrigger>
                            {filteredSubprograms && (
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Subprograms</SelectLabel>
                                        {filteredSubprograms.map(
                                            (subprogram: Subprogram): JSX.Element => (
                                                <SelectItem key={subprogram.id} value={String(subprogram.id)}>
                                                    {subprogram.name}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            )}
                        </Select>
                        {formHandler.invalid('subprogram_id') && <FieldError>{formHandler.errors.subprogram_id}</FieldError>}
                    </Field>

                    <Field data-invalid={!!formHandler.errors.remarks}>
                        <FieldLabel htmlFor="remarks">Remarks</FieldLabel>
                        <Textarea
                            id="remarks"
                            name="remarks"
                            autoComplete="off"
                            placeholder="Remarks"
                            aria-invalid={!!formHandler.errors.remarks}
                            className={formHandler.data.appropriation_id === 3 ? 'h-32' : ''}
                            value={String(formHandler.data.remarks ?? '')}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => formHandler.setData('remarks', e.target.value)}
                        />
                        {formHandler.invalid('remarks') && <FieldError>{formHandler.errors.remarks}</FieldError>}
                    </Field>
                </FieldGroup>
            </FieldSet>
        </FieldSet>
    );
};

export default AllocationBaseForm;
