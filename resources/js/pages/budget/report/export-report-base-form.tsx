import { DatePicker } from '@/components/date-picker';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useModalContext } from '@/contexts/modal-context';
import type { Report } from '@/types';
import { JSX } from 'react';

const ExportReportBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Report>();

    return (
        <FieldSet>
            <FieldGroup className="px-5 pt-5">
                <FieldSet>
                    <FieldContent>
                        <FieldLabel htmlFor="report">Report Type</FieldLabel>
                        <FieldDescription>Select the report type to generate.</FieldDescription>
                    </FieldContent>
                    <RadioGroup
                        name="type"
                        value={String(formHandler.data.type)}
                        onValueChange={(value: string): void => formHandler.setData('type', value)}
                    >
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

            <FieldGroup className="px-5">
                <Field data-invalid={!!formHandler.errors.date}>
                    <FieldLabel htmlFor="date">Date</FieldLabel>
                    <DatePicker
                        id="date"
                        value={String(formHandler.data.date)}
                        onChange={(date: Date | undefined): void => {
                            if (date) {
                                const formatted: string = date.toLocaleDateString('en-CA');
                                formHandler.setData('date', formatted);
                            }
                        }}
                    />
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default ExportReportBaseForm;
