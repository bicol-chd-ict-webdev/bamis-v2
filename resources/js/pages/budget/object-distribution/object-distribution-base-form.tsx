import Combobox from '@/components/combobox';
import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { useExpenditureContext } from '@/contexts/expenditure-context';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type ObjectDistributionBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const ObjectDistributionBaseForm = ({ formHandler }: ObjectDistributionBaseFormProps) => {
    const { expenditures } = useExpenditureContext();

    const handleExpenditureChange = (selectedExpenditure: number) => {
        formHandler.setData('expenditure_id', selectedExpenditure);
    };

    return (
        <FormField>
            <FormItem>
                <Label htmlFor="expenditure-id">Expenditure</Label>
                <Combobox
                    id="expenditure-id"
                    placeholder="Select Expenditure"
                    hasError={formHandler.errors.expenditure_id}
                    selectedValue={Number(formHandler.data.expenditure_id)}
                    onSelect={handleExpenditureChange}
                    data={expenditures}
                />
                <InputError message={formHandler.errors.expenditure_id} />
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

export default ObjectDistributionBaseForm;
