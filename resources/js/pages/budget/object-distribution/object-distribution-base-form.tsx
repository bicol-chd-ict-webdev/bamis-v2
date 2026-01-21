import Combobox from '@/components/combobox';
import { MoneyInput } from '@/components/money-input';
import { useExpenditureContext } from '@/contexts/expenditure-context';
import { useModalContext } from '@/contexts/modal-context';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { JSX } from 'react';
import { ObjectDistribution } from '@/types';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';

const ObjectDistributionBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<ObjectDistribution>();
    const { expenditures } = useExpenditureContext();

    const handleExpenditureChange = (selectedExpenditure: number): void => {
        formHandler.setData('expenditure_id', selectedExpenditure);
    };

    return (
        <FieldSet>
            <FieldGroup className="p-5">
                <Field data-invalid={!!formHandler.errors.expenditure_id}>
                    <FieldLabel htmlFor="expenditure-id">Expenditure</FieldLabel>
                    <Combobox
                        id="expenditure-id"
                        placeholder="Choose expenditure"
                        hasError={formHandler.errors.expenditure_id}
                        selectedValue={Number(formHandler.data.expenditure_id)}
                        onSelect={handleExpenditureChange}
                        data={expenditures}
                        onBlur={(): InertiaPrecognitiveFormProps<ObjectDistribution> => formHandler.validate('expenditure_id')}
                    />
                    {formHandler.invalid('expenditure_id') && <FieldError>{formHandler.errors.expenditure_id}</FieldError>}
                </Field>

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
            </FieldGroup>
        </FieldSet>
    );
};

export default ObjectDistributionBaseForm;
