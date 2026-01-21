import { DatePicker } from '@/components/date-picker';
import GlassyCard from '@/components/glassy-card';
import { MoneyInput } from '@/components/money-input';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import type { Disbursement } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { CircleMinus, Info, Wallet } from 'lucide-react';
import { ChangeEvent, JSX, useMemo } from 'react';

const DisbursementBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Disbursement>();

    // Aggregate Deductions
    const aggregateDeductions: number = useMemo((): number => {
        return (
            Number(formHandler.data.tax ?? 0) +
            Number(formHandler.data.retention ?? 0) +
            Number(formHandler.data.penalty ?? 0) +
            Number(formHandler.data.absences ?? 0) +
            Number(formHandler.data.other_deductions ?? 0)
        );
    }, [formHandler.data.tax, formHandler.data.retention, formHandler.data.penalty, formHandler.data.absences, formHandler.data.other_deductions]);

    // Gross Assessment = Net Amount + Aggregate Deductions
    const grossAssessment: number = useMemo((): number => {
        return Number(formHandler.data.net_amount ?? 0) + aggregateDeductions;
    }, [formHandler.data.net_amount, aggregateDeductions]);

    const deductionLabels: Record<string, string> = {
        tax: 'Tax',
        retention: 'Retention',
        penalty: 'Penalty',
        absences: 'Absences',
        other_deductions: 'Others',
    };

    return (
        <FieldSet className="p-5">
            <FieldContent className="gap-4">
                {/* Core Settlement */}
                <GlassyCard>
                    <ItemHeader className="justify-start px-4 pt-3 pb-4">
                        <ItemMedia>
                            <Wallet size={20} />
                        </ItemMedia>
                        <ItemTitle>Core Settlement</ItemTitle>
                    </ItemHeader>
                    <Item variant="outline" className="bg-card">
                        <ItemContent>
                            <FieldGroup className="grid grid-cols-2">
                                <Field data-invalid={!!formHandler.errors.date}>
                                    <FieldLabel htmlFor="date">Date</FieldLabel>
                                    <DatePicker
                                        id="date"
                                        value={formHandler.data.date || ''}
                                        ariaInvalid={!!formHandler.errors.date}
                                        disableDates={(date: Date): boolean => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            return date > today;
                                        }}
                                        onChange={(date: Date | undefined): void => {
                                            if (date) {
                                                formHandler.setData('date', date.toLocaleDateString('en-CA'));
                                            }
                                        }}
                                        onBlur={(): InertiaPrecognitiveFormProps<Disbursement> => formHandler.validate('date')}
                                    />
                                    {formHandler.invalid('date') && <FieldError>{formHandler.errors.date}</FieldError>}
                                </Field>

                                <Field data-invalid={!!formHandler.errors.net_amount}>
                                    <FieldLabel htmlFor="net-amount">Net Amount</FieldLabel>
                                    <MoneyInput
                                        name="net_amount"
                                        id="net-amount"
                                        invalid={!!formHandler.errors.net_amount}
                                        value={String(formHandler.data.net_amount ?? '')}
                                        onValueChange={(value: string): void => formHandler.setData('net_amount', String(value))}
                                    />
                                    {formHandler.invalid('net_amount') && <FieldError>{formHandler.errors.net_amount}</FieldError>}
                                </Field>

                                <Field data-invalid={!!formHandler.errors.check_date}>
                                    <FieldLabel htmlFor="check-date">Check Date</FieldLabel>
                                    <DatePicker
                                        id="check-date"
                                        value={formHandler.data.check_date || ''}
                                        ariaInvalid={!!formHandler.errors.check_date}
                                        disableDates={(check_date: Date): boolean => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            return check_date > today;
                                        }}
                                        onChange={(check_date: Date | undefined): void => {
                                            if (check_date) formHandler.setData('check_date', check_date.toLocaleDateString('en-CA'));
                                        }}
                                        onBlur={(): InertiaPrecognitiveFormProps<Disbursement> => formHandler.validate('check_date')}
                                    />
                                    {formHandler.invalid('check_date') && <FieldError>{formHandler.errors.check_date}</FieldError>}
                                </Field>

                                <Field data-invalid={!!formHandler.errors.check_number}>
                                    <FieldLabel htmlFor="check-number">Check Number/LDDAP</FieldLabel>
                                    <Input
                                        id="check-number"
                                        name="check_number"
                                        autoComplete="off"
                                        minLength={3}
                                        maxLength={20}
                                        placeholder="9397"
                                        aria-invalid={!!formHandler.errors.check_number}
                                        value={formHandler.data.check_number ?? ''}
                                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('check_number', e.target.value)}
                                        onBlur={(): InertiaPrecognitiveFormProps<Disbursement> => formHandler.validate('check_number')}
                                    />
                                    {formHandler.invalid('check_number') && <FieldError>{formHandler.errors.check_number}</FieldError>}
                                </Field>
                            </FieldGroup>
                        </ItemContent>
                    </Item>
                </GlassyCard>

                {/* Deductions */}
                <GlassyCard>
                    <ItemHeader className="justify-start px-4 pt-3 pb-4">
                        <ItemMedia>
                            <CircleMinus className="text-destructive" size={20} />
                        </ItemMedia>
                        <ItemTitle>Deductions</ItemTitle>
                    </ItemHeader>
                    <Item variant="outline" className="bg-card">
                        <ItemContent>
                            <FieldGroup className="grid grid-cols-2">
                                {['tax', 'retention', 'penalty', 'absences', 'other_deductions'].map(
                                    (field: string): JSX.Element => (
                                        <Field key={field} data-invalid={!!formHandler.errors[field as keyof Disbursement]}>
                                            <FieldLabel htmlFor={field}>{deductionLabels[field]}</FieldLabel>
                                            <MoneyInput
                                                name={field}
                                                id={field}
                                                invalid={!!formHandler.errors[field as keyof Disbursement]}
                                                value={String(formHandler.data[field as keyof Disbursement] ?? '')}
                                                onValueChange={(value: string): void =>
                                                    formHandler.setData(field as keyof Disbursement, String(value))
                                                }
                                            />
                                            {formHandler.invalid(field as keyof Disbursement) && (
                                                <FieldError>{formHandler.errors[field as keyof Disbursement]}</FieldError>
                                            )}
                                        </Field>
                                    ),
                                )}
                            </FieldGroup>
                        </ItemContent>
                    </Item>
                </GlassyCard>

                {/* Totals */}
                <Item className="bg-accent-foreground px-5 pb-5">
                    <ItemContent className="gap-2 divide-y divide-muted-foreground/25">
                        <div className="flex w-full items-end justify-between gap-4 divide-x divide-muted-foreground/25 pb-2">
                            <div className="w-1/2">
                                <ItemDescription className="font-semibold">Net Amount</ItemDescription>
                                <ItemTitle className="text-3xl font-extrabold text-primary">
                                    {FormatMoney(Number(formHandler.data.net_amount))}
                                </ItemTitle>
                            </div>
                            <div className="w-1/2 place-items-end">
                                <ItemDescription className="font-semibold">Aggregate Deductions</ItemDescription>
                                <ItemTitle className="text-xl font-bold text-primary-foreground">{FormatMoney(aggregateDeductions)}</ItemTitle>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Info className="size-4 text-muted-foreground" />
                                <ItemDescription className="font-semibold">Gross Assessment</ItemDescription>
                            </div>
                            <ItemTitle className="text-xl font-bold text-primary-foreground">{FormatMoney(grossAssessment)}</ItemTitle>
                        </div>
                    </ItemContent>
                </Item>

                {/* Remarks */}
                <Item variant="muted">
                    <ItemContent>
                        <Field data-invalid={!!formHandler.errors.remarks}>
                            <FieldLabel htmlFor="remarks">Remarks</FieldLabel>
                            <Textarea
                                id="remarks"
                                name="remarks"
                                autoComplete="off"
                                placeholder="Document technical justifications or audit trails details..."
                                className="h-26"
                                aria-invalid={!!formHandler.errors.remarks}
                                value={String(formHandler.data.remarks ?? '')}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => formHandler.setData('remarks', e.target.value)}
                                onBlur={(): InertiaPrecognitiveFormProps<Disbursement> => formHandler.validate('remarks')}
                            />
                            {formHandler.invalid('remarks') && <FieldError>{formHandler.errors.remarks}</FieldError>}
                        </Field>
                    </ItemContent>
                </Item>
            </FieldContent>
        </FieldSet>
    );
};

export default DisbursementBaseForm;
