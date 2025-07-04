import Combobox from '@/components/combobox';
import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { useSectionContext } from '@/contexts/section-context';
import { InertiaFormProps } from '@inertiajs/react';

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
        </FormField>
    );
};

export default OfficeAllotmentBaseForm;
