import Combobox from '@/components/combobox';
import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { useSectionContext } from '@/contexts/section-context';
import { InertiaFormProps } from '@inertiajs/react';
import { Input } from '@/components/ui/input';

type OfficeAllotmentBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const OfficeAllotmentBaseForm = ({ formHandler }: OfficeAllotmentBaseFormProps) => {
    const { sections } = useSectionContext();

    const handleSectionChange = (selectedSection: number) => {
        formHandler.setData('section_id', selectedSection);
    };

    return (
        <FormField>
            <FormItem>
                <Label htmlFor="section-id">Section</Label>
                <Combobox
                    id="section-id"
                    placeholder="Select Section"
                    hasError={formHandler.errors.section_id}
                    selectedValue={Number(formHandler.data.section_id)}
                    onSelect={handleSectionChange}
                    data={sections}
                />
                <InputError message={formHandler.errors.section_id} />
            </FormItem>

            <FormField className="mt-0 grid-cols-3">
                <FormItem>
                    <Label htmlFor="wfp-suffix-code">WFP Suffix Code</Label>
                    <Input
                        id="wfp-suffix-code"
                        name="wfp_suffix_code"
                        autoComplete="off"
                        minLength={1}
                        maxLength={5}
                        placeholder="18"
                        aria-invalid={!!formHandler.errors.wfp_suffix_code}
                        value={String(formHandler.data.wfp_suffix_code)}
                        onChange={(e) => formHandler.setData('wfp_suffix_code', e.target.value)}
                    />
                    <InputError message={formHandler.errors.wfp_suffix_code} />
                </FormItem>

                <FormItem className="col-span-2">
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
            </FormField>
        </FormField>
    );
};

export default OfficeAllotmentBaseForm;
