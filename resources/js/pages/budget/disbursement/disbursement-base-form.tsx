import { DatePicker } from '@/components/date-picker';
import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type DisbursementBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const DisbursementBaseForm = ({ formHandler }: DisbursementBaseFormProps) => {
    return (
        <FormField className="mt-0">
            <FormField className="mt-0 grid-cols-2">
                <FormItem>
                    <Label htmlFor="date">Date</Label>
                    <DatePicker
                        id="date"
                        value={String(formHandler.data.date)}
                        onChange={(date) => {
                            if (date) {
                                const formatted = date.toLocaleDateString('en-CA');
                                formHandler.setData('date', formatted);
                            }
                        }}
                    />
                    <InputError message={formHandler.errors.date} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="net-amount">Net Amount</Label>
                    <MoneyInput
                        id="net-amount"
                        name="net_amount"
                        invalid={!!formHandler.errors.net_amount}
                        value={String(formHandler.data.net_amount) ?? ''}
                        onValueChange={(value) => formHandler.setData('net_amount', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.net_amount} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="tax">Tax</Label>
                    <MoneyInput
                        id="tax"
                        name="tax"
                        invalid={!!formHandler.errors.tax}
                        value={formHandler.data.tax ? String(formHandler.data.tax) : ''}
                        onValueChange={(value) => formHandler.setData('tax', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.tax} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="retention">Retention</Label>
                    <MoneyInput
                        id="retention"
                        name="retention"
                        invalid={!!formHandler.errors.retention}
                        value={formHandler.data.retention ? String(formHandler.data.retention) : ''}
                        onValueChange={(value) => formHandler.setData('retention', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.retention} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="penalty">Penalty</Label>
                    <MoneyInput
                        id="penalty"
                        name="penalty"
                        invalid={!!formHandler.errors.penalty}
                        value={formHandler.data.penalty ? String(formHandler.data.penalty) : ''}
                        onValueChange={(value) => formHandler.setData('penalty', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.penalty} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="other-deductions">Other Deductions</Label>
                    <MoneyInput
                        id="other-deductions"
                        name="other_deductions"
                        invalid={!!formHandler.errors.other_deductions}
                        value={formHandler.errors.other_deductions ? String(formHandler.data.other_deductions) : ''}
                        onValueChange={(value) => formHandler.setData('other_deductions', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.other_deductions} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="absences">Absences</Label>
                    <MoneyInput
                        id="absences"
                        name="absences"
                        invalid={!!formHandler.errors.absences}
                        value={formHandler.errors.absences ? String(formHandler.data.absences) : ''}
                        onValueChange={(value) => formHandler.setData('absences', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.absences} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="check-number">Check Number/LDDAP</Label>
                    <Input
                        id="check-number"
                        name="check_number"
                        autoComplete="off"
                        minLength={3}
                        maxLength={20}
                        placeholder="9397"
                        aria-invalid={!!formHandler.errors.check_number}
                        value={formHandler.data.check_number ? String(formHandler.data.check_number) : ''}
                        onChange={(e) => formHandler.setData('check_number', e.target.value)}
                    />
                    <InputError message={formHandler.errors.check_number} />
                </FormItem>
            </FormField>

            <FormItem>
                <Label htmlFor="check-date">Check Date</Label>
                <DatePicker
                    id="check-date"
                    value={String(formHandler.data.check_date)}
                    onChange={(check_date) => {
                        if (check_date) {
                            const formatted = check_date.toLocaleDateString('en-CA');
                            formHandler.setData('check_date', formatted);
                        }
                    }}
                />
                <InputError message={formHandler.errors.check_date} />
            </FormItem>

            <FormItem>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                    id="remarks"
                    name="remarks"
                    autoComplete="off"
                    placeholder="Remarks"
                    minLength={3}
                    maxLength={255}
                    aria-invalid={!!formHandler.errors.remarks}
                    value={String(formHandler.data.remarks ?? '')}
                    onChange={(e) => formHandler.setData('remarks', e.target.value)}
                />
                <InputError message={formHandler.errors.remarks} />
            </FormItem>
        </FormField>
    );
};

export default DisbursementBaseForm;
