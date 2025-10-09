import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type DueBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const DueBaseForm = ({ formHandler }: DueBaseFormProps) => {
    return (
        <FormField className="mt-0">
            <FormItem>
                <Label htmlFor="amount">Amount Due</Label>
                <MoneyInput
                    id="amount"
                    name="amount"
                    invalid={!!formHandler.errors.amount}
                    value={String(formHandler.data.amount ?? '')}
                    onValueChange={(value) => formHandler.setData('amount', String(value ?? ''))}
                />
                <InputError message={formHandler.errors.amount} />
            </FormItem>
        </FormField>
    );
};

export default DueBaseForm;
