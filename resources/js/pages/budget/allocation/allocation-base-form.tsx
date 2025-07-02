import { DatePicker } from '@/components/date-picker';
import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAllocationContext } from '@/contexts/allocation-context';
import { FormDefaults } from '@/contexts/modal-context';
import { type Program, type Subprogram } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';

type AllocationBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const AllocationBaseForm = ({ formHandler }: AllocationBaseFormProps) => {
    const { lineItems, appropriationTypes, allotmentClasses, projectTypes, programClassifications, programs, subprograms, appropriationSources } =
        useAllocationContext();

    const filteredSubprograms: Subprogram[] = useMemo(() => {
        if (!formHandler.data.program_id || !subprograms) return [];
        return subprograms.filter((subprogram) => subprogram.program_id === Number(formHandler.data.program_id));
    }, [subprograms, formHandler.data.program_id]);

    const filteredPrograms: Program[] = useMemo(() => {
        if (!formHandler.data.appropriation_source || !programs) return [];
        return programs.filter((program) => program.appropriation_source === formHandler.data.appropriation_source);
    }, [programs, formHandler.data.appropriation_source]);

    useEffect(() => {
        if (formHandler.data.appropriation_source === 'Automatic Appropriation') {
            if (formHandler.data.program_id !== 11) {
                formHandler.setData('program_id', 11);
            }
        } else {
            const currentProgramId = Number(formHandler.data.program_id);
            const isStillValid = filteredPrograms.some((program) => program.id === currentProgramId);
            if (!isStillValid) {
                formHandler.setData('program_id', '');
            }
        }
    }, [formHandler.data.appropriation_source, filteredPrograms]);

    useEffect(() => {
        const currentSubprogramId = Number(formHandler.data.subprogram_id);
        const stillValid = filteredSubprograms.some((subprogram) => subprogram.id === currentSubprogramId);
        if (!stillValid) {
            formHandler.setData('subprogram_id', '');
        }
    }, [filteredSubprograms, formHandler.data.subprogram_id]);

    useEffect(() => {
        if (String(formHandler.data.project_type_id) !== '3' && formHandler.data.program_classification !== '') {
            formHandler.setData('program_classification', '');
        }
    }, [formHandler.data.project_type_id, formHandler.data.program_classification]);

    return (
        <FormField>
            <FormField className="mt-0 grid-cols-4">
                <FormItem>
                    <Label htmlFor="appropriation-source">Appropriation Source</Label>
                    <Select
                        name="appropriation_source"
                        value={String(formHandler.data.appropriation_source)}
                        onValueChange={(e) => {
                            formHandler.setData((prev) => ({
                                ...prev,
                                appropriation_source: e,
                                project_type_id: e !== 'New Appropriation' ? '' : prev.project_type_id,
                                allotment_class_id: e === 'Automatic Appropriation' ? 1 : '',
                                program_classification: '',
                            }));
                        }}
                    >
                        <SelectTrigger id="appropriation-source" aria-invalid={!!formHandler.errors.appropriation_source}>
                            <SelectValue placeholder="Select Appropriation Source" />
                        </SelectTrigger>
                        <SelectContent>
                            {appropriationSources.map((appropriationSource) => (
                                <SelectItem key={appropriationSource.value} value={String(appropriationSource.value)}>
                                    {appropriationSource.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={formHandler.errors.appropriation_source} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="appropriation-type-id">Appropriation Type</Label>
                    <Select
                        name="appropriation_type_id"
                        value={String(formHandler.data.appropriation_type_id)}
                        onValueChange={(e) => formHandler.setData('appropriation_type_id', e)}
                    >
                        <SelectTrigger id="appropriation-type-id" aria-invalid={!!formHandler.errors.appropriation_type_id}>
                            <SelectValue placeholder="Select Appropriation Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {appropriationTypes.map((appropriationType) => (
                                <SelectItem key={appropriationType.id} value={String(appropriationType.id)}>
                                    {appropriationType.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={formHandler.errors.appropriation_type_id} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="project-type-id">Project Type</Label>
                    <Select
                        name="project_type_id"
                        value={String(formHandler.data.project_type_id)}
                        onValueChange={(e) => formHandler.setData('project_type_id', e)}
                        disabled={formHandler.data.appropriation_source !== 'New Appropriation'}
                    >
                        <SelectTrigger id="project-type-id" aria-invalid={!!formHandler.errors.project_type_id}>
                            <SelectValue placeholder="Select Project Type" />
                        </SelectTrigger>
                        {projectTypes && (
                            <SelectContent>
                                {projectTypes.map((projectType) => (
                                    <SelectItem key={projectType.id} value={String(projectType.id)}>
                                        {projectType.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                    <InputError message={formHandler.errors.project_type_id} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="allotment-class-id">Allotment Class</Label>
                    <Select
                        name="allotment_class_id"
                        value={String(formHandler.data.allotment_class_id)}
                        onValueChange={(e) => formHandler.setData('allotment_class_id', e)}
                        disabled={formHandler.data.appropriation_source === 'Automatic Appropriation'}
                    >
                        <SelectTrigger id="allotment-class-id" aria-invalid={!!formHandler.errors.allotment_class_id}>
                            <SelectValue placeholder="Select Allotment Class" />
                        </SelectTrigger>
                        <SelectContent>
                            {allotmentClasses.map((allotmentClass) => (
                                <SelectItem key={allotmentClass.id} value={String(allotmentClass.id)}>
                                    {allotmentClass.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={formHandler.errors.allotment_class_id} />
                </FormItem>
            </FormField>

            <FormItem>
                <Label htmlFor="program-classification">Program Classification</Label>
                <Select
                    name="program_classification"
                    value={String(formHandler.data.program_classification)}
                    onValueChange={(e) => formHandler.setData('program_classification', e)}
                    disabled={String(formHandler.data.project_type_id) !== '3'}
                >
                    <SelectTrigger id="program-classification" aria-invalid={!!formHandler.errors.program_classification}>
                        <SelectValue placeholder="Select Program Classification" />
                    </SelectTrigger>
                    {programClassifications && (
                        <SelectContent>
                            {programClassifications.map((programClassification) => (
                                <SelectItem key={programClassification.value} value={String(programClassification.value)}>
                                    {programClassification.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    )}
                </Select>
                <InputError message={formHandler.errors.program_classification} />
            </FormItem>

            <FormField className="mt-0 grid-cols-2">
                <FormItem>
                    <Label htmlFor="program-id">Program</Label>
                    <Select
                        name="program_id"
                        value={String(formHandler.data.program_id)}
                        onValueChange={(e) => formHandler.setData('program_id', e)}
                        disabled={formHandler.data.appropriation_source === 'Automatic Appropriation'}
                    >
                        <SelectTrigger id="program-id" aria-invalid={!!formHandler.errors.program_id}>
                            <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        {filteredPrograms && (
                            <SelectContent>
                                {filteredPrograms.map((program) => (
                                    <SelectItem key={program.id} value={String(program.id)}>
                                        {program.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                    <InputError message={formHandler.errors.program_id} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="subprogram-id">Subprogram</Label>
                    <Select
                        name="subprogram_id"
                        value={String(formHandler.data.subprogram_id)}
                        onValueChange={(e) => formHandler.setData('subprogram_id', e)}
                        disabled={filteredSubprograms.length < 1}
                    >
                        <SelectTrigger id="subprogram-id" aria-invalid={!!formHandler.errors.subprogram_id}>
                            <SelectValue placeholder="Select Subprogram" />
                        </SelectTrigger>
                        {filteredSubprograms && (
                            <SelectContent>
                                {filteredSubprograms.map((subprogram) => (
                                    <SelectItem key={subprogram.id} value={String(subprogram.id)}>
                                        {subprogram.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                    <InputError message={formHandler.errors.subprogram_id} />
                </FormItem>
            </FormField>

            <FormItem>
                <Label htmlFor="line-item-id">Line Item</Label>
                <Select
                    name="line_item_id"
                    value={String(formHandler.data.line_item_id)}
                    onValueChange={(e) => formHandler.setData('line_item_id', e)}
                >
                    <SelectTrigger id="line-item-id" aria-invalid={!!formHandler.errors.line_item_id}>
                        <SelectValue placeholder="Select Line Item" />
                    </SelectTrigger>
                    <SelectContent>
                        {lineItems.map((lineItem) => (
                            <SelectItem key={lineItem.id} value={String(lineItem.id)}>
                                {lineItem.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.line_item_id} />
            </FormItem>

            <FormField className="mt-0 grid-cols-2">
                <FormItem>
                    <Label htmlFor="amount">Amount</Label>
                    <MoneyInput
                        id="amount"
                        name="amount"
                        invalid={!!formHandler.errors.amount}
                        value={String(formHandler.data.amount) ?? ''}
                        onValueChange={(value) => formHandler.setData('amount', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.amount} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="date-received">Date Received</Label>
                    <DatePicker
                        id="date-received"
                        value={String(formHandler.data.date_received)}
                        onChange={(date) => {
                            if (date) {
                                const formatted = date.toLocaleDateString('en-CA');
                                formHandler.setData('date_received', formatted);
                            }
                        }}
                    />
                    <InputError message={formHandler.errors.date_received} />
                </FormItem>
            </FormField>

            {formHandler.data.appropriation_id === '2' && (
                <>
                    <FormItem>
                        <Label htmlFor="particulars">Particulars</Label>
                        <Textarea
                            id="particulars"
                            name="particulars"
                            autoComplete="off"
                            placeholder="Particulars"
                            aria-invalid={!!formHandler.errors.particulars}
                            value={String(formHandler.data.particulars)}
                            onChange={(e) => formHandler.setData('particulars', e.target.value)}
                        />
                        <InputError message={formHandler.errors.particulars} />
                    </FormItem>

                    <FormField className="mt-0 grid-cols-3">
                        <FormItem>
                            <Label htmlFor="additional-code">Additional Code</Label>
                            <Input
                                id="additional-code"
                                name="additional_code"
                                autoComplete="off"
                                minLength={3}
                                maxLength={20}
                                placeholder="NHWSS"
                                aria-invalid={formHandler.errors.additional_code ? true : false}
                                value={String(formHandler.data.additional_code)}
                                onChange={(e) => formHandler.setData('additional_code', e.target.value)}
                            />
                            <InputError message={formHandler.errors.additional_code} />
                        </FormItem>

                        <FormItem>
                            <Label htmlFor="saa-number">SAA Number</Label>
                            <Input
                                id="saa-number"
                                name="saa_number"
                                autoComplete="off"
                                minLength={9}
                                maxLength={15}
                                placeholder="2024-04-001648"
                                aria-invalid={formHandler.errors.saa_number ? true : false}
                                value={String(formHandler.data.saa_number)}
                                onChange={(e) => formHandler.setData('saa_number', e.target.value)}
                            />
                            <InputError message={formHandler.errors.saa_number} />
                        </FormItem>

                        <FormItem>
                            <Label htmlFor="department_order">Department Order</Label>
                            <Input
                                id="department_order"
                                name="department_order"
                                autoComplete="off"
                                minLength={5}
                                maxLength={10}
                                placeholder="2025-0591"
                                aria-invalid={formHandler.errors.department_order ? true : false}
                                value={String(formHandler.data.department_order)}
                                onChange={(e) => formHandler.setData('department_order', e.target.value)}
                            />
                            <InputError message={formHandler.errors.department_order} />
                        </FormItem>
                    </FormField>
                </>
            )}

            <FormItem>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                    id="remarks"
                    name="remarks"
                    autoComplete="off"
                    placeholder="Remarks"
                    aria-invalid={!!formHandler.errors.remarks}
                    value={String(formHandler.data.remarks)}
                    onChange={(e) => formHandler.setData('remarks', e.target.value)}
                />
                <InputError message={formHandler.errors.remarks} />
            </FormItem>
        </FormField>
    );
};

export default AllocationBaseForm;
