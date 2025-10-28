import { DatePicker } from '@/components/date-picker';
import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldTitle } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type ExportReportBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const ExportReportBaseForm = ({ formHandler }: ExportReportBaseFormProps) => {
    return (
        <>
            <FieldGroup>
                <FieldSet>
                    <FieldContent>
                        <FieldLabel htmlFor="report">Report Type</FieldLabel>
                        <FieldDescription>Select the report type to generate.</FieldDescription>
                    </FieldContent>
                    <RadioGroup name="type" value={String(formHandler.data.type)} onValueChange={(value) => formHandler.setData('type', value)}>
                        <FieldLabel htmlFor="saob-chd">
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>SAOB</FieldTitle>
                                    <FieldDescription>
                                        Statement of Appropriations, Allotments, Obligations, Disbursements, and Balances.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="saob-chd" id="saob-chd" />
                            </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="bur-division">
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>BUR - Division</FieldTitle>
                                    <FieldDescription>Budget Utilization Report by Division/Section.</FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="bur-division" id="bur-division" />
                            </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="bur-allotment-class">
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>BUR - Allotment Class</FieldTitle>
                                    <FieldDescription>Budget Utilization Report by Allotment Class.</FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="bur-allotment-class" id="bur-allotment-class" />
                            </Field>
                        </FieldLabel>
                    </RadioGroup>
                </FieldSet>
            </FieldGroup>

            <FormField>
                <FormField className="mt-0">
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
                    </FormItem>
                </FormField>
            </FormField>
        </>
    );
};

export default ExportReportBaseForm;
