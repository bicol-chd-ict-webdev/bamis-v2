import Combobox from '@/components/combobox';
import { MoneyInput } from '@/components/money-input';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useModalContext } from '@/contexts/modal-context';
import { useSectionContext } from '@/contexts/section-context';
import type { OfficeAllotment } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { ChangeEvent, JSX } from 'react';

const OfficeAllotmentBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<OfficeAllotment>();
    const { sections } = useSectionContext();

    const handleSectionChange = (selectedSection: number): void => {
        formHandler.setData('section_id', selectedSection);
    };

    return (
        <FieldSet>
            <FieldGroup className="px-5 pt-5">
                <Field data-invalid={!!formHandler.errors.section_id}>
                    <FieldLabel htmlFor="section-id">Section</FieldLabel>
                    <Combobox
                        id="section-id"
                        placeholder="Choose section"
                        hasError={formHandler.errors.section_id}
                        selectedValue={Number(formHandler.data.section_id)}
                        onSelect={handleSectionChange}
                        data={sections}
                        onBlur={(): InertiaPrecognitiveFormProps<OfficeAllotment> => formHandler.validate('section_id')}
                    />
                    {formHandler.invalid('section_id') && <FieldError>{formHandler.errors.section_id}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-3 px-5 pb-5">
                <Field data-invalid={!!formHandler.errors.wfp_suffix_code} className="col-span-1">
                    <FieldLabel htmlFor="wfp-suffix-code">WFP Suffix Code</FieldLabel>
                    <Input
                        id="wfp-suffix-code"
                        name="wfp_suffix_code"
                        autoComplete="off"
                        minLength={1}
                        maxLength={5}
                        placeholder="18"
                        aria-invalid={!!formHandler.errors.wfp_suffix_code}
                        value={String(formHandler.data.wfp_suffix_code)}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('wfp_suffix_code', e.target.value)}
                    />
                    {formHandler.invalid('wfp_suffix_code') && <FieldError>{formHandler.errors.wfp_suffix_code}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.amount} className="col-span-2">
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
            </FieldGroup>
        </FieldSet>
    );
};

export default OfficeAllotmentBaseForm;
