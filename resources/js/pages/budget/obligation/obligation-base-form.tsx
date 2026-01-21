import Combobox from '@/components/combobox';
import { DatePicker } from '@/components/date-picker';
import { MoneyInput } from '@/components/money-input';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useModalContext } from '@/contexts/modal-context';
import { useObjectDistributionContext } from '@/contexts/object-distribution-context';
import { useObligationContext } from '@/contexts/obligation-context';
import { useOfficeContext } from '@/contexts/office-context';
import { useSingleAllocationContext } from '@/contexts/single-allocation-context';
import { FormatMoney } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import type { Obligation, RecipientEnum, Section } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { ArrowRight, Calculator, Fingerprint, History, ListCheck, PieChartIcon, Plus, ShieldAlert, ShieldBan, ShieldCheck, X } from 'lucide-react';
import { ChangeEvent, JSX } from 'react';

const ObligationBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Obligation>();
    const { allocation } = useSingleAllocationContext();
    const { objectDistributions } = useObjectDistributionContext();
    const { recipients } = useObligationContext();
    const { officeAllotmentsGroupedBySection } = useOfficeContext();

    const handleObjectDistributionChange = (selectedObjectDistributionId: number): void => {
        formHandler.setData('object_distribution_id' as const, selectedObjectDistributionId);
    };

    const offices = Array.isArray(formHandler.data.offices) ? formHandler.data.offices : formHandler.data.offices ? [formHandler.data.offices] : [];

    const totalAmount: number = offices.reduce((sum: number, office): number => sum + Number(office.amount || 0), 0);

    return (
        <FieldSet>
            <FieldGroup className="grid grid-cols-4 px-5 pt-5">
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
                                const formatted: string = date.toLocaleDateString('en-CA');
                                formHandler.setData('date' as const, formatted);
                            }
                        }}
                        onBlur={(): void => {
                            formHandler.validate('date');
                        }}
                    />
                    {formHandler.invalid('date') && <FieldError>{formHandler.errors.date}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.series}>
                    <FieldLabel htmlFor="series">Series</FieldLabel>
                    <Input
                        id="series"
                        name="series"
                        autoComplete="off"
                        placeholder="0002A"
                        minLength={3}
                        maxLength={10}
                        aria-invalid={!!formHandler.errors.series}
                        value={formHandler.data.series ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                            const value: string = e.target.value;
                            const regex = /^[0-9A-Z-]*$/;

                            if (regex.test(value)) {
                                formHandler.setData('series' as const, value);
                            }
                        }}
                        onBlur={(): InertiaPrecognitiveFormProps<Obligation> => formHandler.validate('series')}
                    />
                    {formHandler.invalid('series') && <FieldError>{formHandler.errors.series}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.dtrak_number}>
                    <FieldLabel htmlFor="dtrak-number">Dtrak Number</FieldLabel>
                    <Input
                        id="dtrak-number"
                        name="dtrak_number"
                        autoComplete="off"
                        minLength={4}
                        maxLength={10}
                        placeholder="9397"
                        aria-invalid={!!formHandler.errors.dtrak_number}
                        value={formHandler.data.dtrak_number ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                            const value: string = e.target.value;
                            const regex = /^[0-9]*$/;

                            if (regex.test(value)) {
                                formHandler.setData('dtrak_number' as const, value);
                            }
                        }}
                        onBlur={(): InertiaPrecognitiveFormProps<Obligation> => formHandler.validate('dtrak_number')}
                    />
                    {formHandler.invalid('dtrak_number') && <FieldError>{formHandler.errors.dtrak_number}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.reference_number}>
                    <FieldLabel htmlFor="reference-number">Reference Number</FieldLabel>
                    <Input
                        id="reference-number"
                        name="reference_number"
                        autoComplete="off"
                        minLength={9}
                        maxLength={15}
                        placeholder="25-03-1025"
                        aria-invalid={!!formHandler.errors.reference_number}
                        value={formHandler.data.reference_number ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                            const value: string = e.target.value;
                            const regex = /^[0-9A-Z-]*$/;

                            if (regex.test(value)) {
                                formHandler.setData('reference_number' as const, value);
                            }
                        }}
                        onBlur={(): InertiaPrecognitiveFormProps<Obligation> => formHandler.validate('reference_number')}
                    />
                    {formHandler.invalid('reference_number') && <FieldError>{formHandler.errors.reference_number}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="px-5">
                <Field data-invalid={!!formHandler.errors.object_distribution_id}>
                    <FieldLabel htmlFor="object-distribution-id">Expenditure</FieldLabel>
                    <Combobox
                        id="object-distribution-id"
                        placeholder="Choose expenditure"
                        hasError={formHandler.errors.object_distribution_id}
                        selectedValue={Number(formHandler.data.object_distribution_id)}
                        onSelect={handleObjectDistributionChange}
                        data={objectDistributions}
                    />
                    {formHandler.invalid('object_distribution_id') && <FieldError>{formHandler.errors.object_distribution_id}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-3 items-start gap-6 px-5">
                <Item variant="muted" className="col-span-2">
                    <ItemHeader className="justify-start">
                        <ItemMedia>
                            <ListCheck size={20} />
                        </ItemMedia>
                        <ItemTitle>Transaction Summary</ItemTitle>
                    </ItemHeader>
                    <ItemContent>
                        <FieldGroup>
                            <Field data-invalid={!!formHandler.errors.creditor}>
                                <FieldLabel htmlFor="creditor">Creditor</FieldLabel>
                                <Input
                                    id="creditor"
                                    name="creditor"
                                    autoComplete="off"
                                    minLength={3}
                                    maxLength={100}
                                    placeholder="COS - Juan Dela Cruz"
                                    aria-invalid={!!formHandler.errors.creditor}
                                    value={formHandler.data.creditor ?? ''}
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('creditor' as const, e.target.value)}
                                    onBlur={(): InertiaPrecognitiveFormProps<Obligation> => formHandler.validate('creditor')}
                                />
                                {formHandler.invalid('creditor') && <FieldError>{formHandler.errors.creditor}</FieldError>}
                            </Field>

                            <Field data-invalid={!!formHandler.errors.particulars}>
                                <FieldLabel htmlFor="particulars">Particulars</FieldLabel>
                                <Textarea
                                    id="particulars"
                                    name="particulars"
                                    autoComplete="off"
                                    placeholder="Describe the nature or purpose of this obligation..."
                                    className="h-26"
                                    aria-invalid={!!formHandler.errors.particulars}
                                    value={String(formHandler.data.particulars ?? '')}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
                                        formHandler.setData('particulars' as const, e.target.value)
                                    }
                                    onBlur={(): InertiaPrecognitiveFormProps<Obligation> => formHandler.validate('particulars')}
                                />
                                {formHandler.invalid('particulars') && <FieldError>{formHandler.errors.particulars}</FieldError>}
                            </Field>
                        </FieldGroup>
                    </ItemContent>
                </Item>

                <Item variant="outline">
                    <ItemHeader className="justify-start">
                        <ItemMedia>
                            <ArrowRight size={20} className={cn(formHandler.data.is_transferred && 'text-primary')} />
                        </ItemMedia>
                        <ItemTitle>Fund Transfer</ItemTitle>
                    </ItemHeader>
                    <ItemContent>
                        <Item variant="muted" size="sm" className="gap-1">
                            <ItemHeader>
                                <Label htmlFor="is-transferred" className="flex flex-1 items-center justify-between">
                                    <p>Transfer to CO/OUs?</p>
                                    <Switch
                                        id="is-transferred"
                                        name="is_transferred"
                                        value={formHandler.data.is_transferred ? 'on' : 'off'}
                                        checked={formHandler.data.is_transferred}
                                        onCheckedChange={(checked: boolean): void => {
                                            formHandler.setData('is_transferred' as const, checked);

                                            if (!checked) {
                                                formHandler.setData('recipient' as const, '');
                                            }
                                        }}
                                    />
                                </Label>
                            </ItemHeader>

                            <ItemDescription className="text-xs">This obligation will be settled directly within the current unit.</ItemDescription>
                        </Item>

                        {!formHandler.data.is_transferred && (
                            <Item variant="outline" className="mt-3 flex-col border-2 border-dashed border-border/70">
                                <ItemHeader className="flex-1 items-center justify-center">
                                    <ItemMedia variant="image">
                                        <Avatar className="size-10 w-full items-center justify-center bg-muted/70">
                                            <ShieldCheck className="text-muted-foreground/70" />
                                        </Avatar>
                                    </ItemMedia>
                                </ItemHeader>
                                <ItemContent className="items-center">
                                    <ItemTitle className="text-foreground/70">Operating Unit Settlement</ItemTitle>
                                    <ItemDescription className="text-xs text-muted-foreground/70 italic">
                                        No external unit mapping required
                                    </ItemDescription>
                                </ItemContent>
                            </Item>
                        )}

                        {formHandler.data.is_transferred && (
                            <Item variant="outline" className={cn('mt-3', formHandler.data.is_transferred && 'border-primary/30 bg-card')}>
                                <Field>
                                    <FieldLabel htmlFor="recipient">Recipient Operating Unit</FieldLabel>
                                    <Select
                                        name="recipient"
                                        value={String(formHandler.data.recipient ?? '')}
                                        onValueChange={(value: string): void => formHandler.setData('recipient' as const, value)}
                                    >
                                        <SelectTrigger
                                            id="recipient"
                                            aria-invalid={!!formHandler.errors.recipient}
                                            onBlur={(): InertiaPrecognitiveFormProps<Obligation> => formHandler.validate('recipient')}
                                            className="w-58! truncate"
                                        >
                                            <SelectValue placeholder="Choose operating unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Operating Units</SelectLabel>
                                                {recipients.map(
                                                    (recipient: RecipientEnum): JSX.Element => (
                                                        <SelectItem key={recipient.value} value={String(recipient.value)}>
                                                            {recipient.value}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {formHandler.invalid('recipient') && <FieldError>{formHandler.errors.recipient}</FieldError>}
                                </Field>
                            </Item>
                        )}
                    </ItemContent>
                </Item>
            </FieldGroup>

            <FieldGroup className="px-5">
                <Item variant="outline" className="col-span-2">
                    <ItemHeader className="justify-start">
                        <ItemMedia>
                            <Fingerprint size={20} />
                        </ItemMedia>
                        <ItemTitle>Classification Strategy</ItemTitle>
                    </ItemHeader>
                    <ItemContent>
                        <RadioGroup
                            className="group grid grid-cols-3 gap-4"
                            value={String(formHandler.data.norsa_type)}
                            onValueChange={(value: string): void => formHandler.setData('norsa_type' as const, value)}
                        >
                            <Item variant="outline" className="items-start p-0">
                                <Label htmlFor="standard" className="w-full p-4 group-hover:cursor-pointer">
                                    <div className="mb-3 flex items-start justify-between">
                                        <ItemMedia variant="icon">
                                            <ShieldBan />
                                        </ItemMedia>
                                        <RadioGroupItem value="" id="standard" />
                                    </div>
                                    <div className="grid">
                                        <p className="mb-1 font-semibold">Standard</p>
                                        <span className="text-xs text-muted-foreground">Regular budgetary entry.</span>
                                    </div>
                                </Label>
                            </Item>

                            <Item variant="outline" className="items-start p-0">
                                <Label htmlFor="current" className="w-full p-4 group-hover:cursor-pointer">
                                    <div className="mb-3 flex items-start justify-between">
                                        <ItemMedia variant="icon">
                                            <ShieldAlert />
                                        </ItemMedia>
                                        <RadioGroupItem value="Current Obligation" id="current" />
                                    </div>
                                    <div className="grid">
                                        <p className="mb-1 font-semibold">Current NORSA</p>
                                        <span className="text-xs text-muted-foreground">Certified for current year.</span>
                                    </div>
                                </Label>
                            </Item>

                            <Item variant="outline" className="group items-start p-0 group-has-disabled:border-border/50">
                                <Label htmlFor="previous" className="w-full p-4 group-has-disabled:cursor-not-allowed">
                                    <div className="mb-3 flex items-start justify-between">
                                        <ItemMedia variant="icon">
                                            <History className="group-has-disabled:text-muted-foreground" />
                                        </ItemMedia>
                                        <RadioGroupItem
                                            value="Previous Obligation"
                                            id="previous"
                                            disabled={Number(allocation.appropriation_type_id) === 1}
                                        />
                                    </div>
                                    <div className="grid">
                                        <p className="mb-1 font-semibold group-has-disabled:opacity-50">Previous NORSA</p>
                                        <span className="text-xs text-muted-foreground group-has-disabled:opacity-50">Prior year carry-over.</span>
                                    </div>
                                </Label>
                            </Item>
                        </RadioGroup>

                        {formHandler.data.norsa_type && <TagObligation />}
                    </ItemContent>
                </Item>
            </FieldGroup>

            <FieldGroup className="px-5">
                <Item variant="outline" className="col-span-2">
                    <ItemHeader>
                        <div className="flex items-center gap-2">
                            <ItemMedia>
                                <PieChartIcon size={20} />
                            </ItemMedia>
                            <ItemTitle>Distribution Matrix</ItemTitle>
                        </div>

                        <Button
                            type="button"
                            size="sm"
                            onClick={(): void =>
                                formHandler.setData('offices' as const, [
                                    ...formHandler.data.offices,
                                    { office_allotment_id: 0, section_id: 0, amount: '' },
                                ])
                            }
                        >
                            <Plus />
                            Distribution
                        </Button>
                    </ItemHeader>
                    <ItemContent>
                        {offices.map(
                            (item, index: number): JSX.Element => (
                                <Item variant="muted" key={index}>
                                    <ItemContent className="flex-row gap-4">
                                        <FieldGroup className="flex-row">
                                            {/* Office */}
                                            <Field data-invalid={!!(formHandler.errors as any)?.[`offices.${index}.section_id`]}>
                                                <FieldLabel htmlFor={`section-id-${index}`}>Office</FieldLabel>
                                                <Combobox
                                                    id={`section-id-${index}`}
                                                    placeholder="Select Office"
                                                    hasError={(formHandler.errors as any)?.[`offices.${index}.section_id`]}
                                                    selectedValue={Number(item.section_id)}
                                                    onSelect={(value: number): void =>
                                                        formHandler.setData(
                                                            'offices' as const,
                                                            offices.map((x, i: number) => (i === index ? { ...x, section_id: value } : x)),
                                                        )
                                                    }
                                                    onBlur={(): InertiaPrecognitiveFormProps<Obligation> =>
                                                        formHandler.validate((formHandler.errors as any)?.[`offices.${index}.section_id`])
                                                    }
                                                    data={officeAllotmentsGroupedBySection}
                                                />
                                                {formHandler.invalid((formHandler.errors as any)?.[`offices.${index}.section_id`]) && (
                                                    <FieldError>{(formHandler.errors as any)?.[`offices.${index}.section_id`]}</FieldError>
                                                )}
                                            </Field>

                                            {/* WFP Code */}
                                            <Field data-invalid={!!(formHandler.errors as any)?.[`offices.${index}.office_allotment_id`]}>
                                                <FieldLabel htmlFor={`office-allotment-id-${index}`}>WFP Code</FieldLabel>
                                                <Combobox
                                                    id={`office-allotment-id-${index}`}
                                                    placeholder="Select Code"
                                                    hasError={(formHandler.errors as any)?.[`offices.${index}.office_allotment_id`]}
                                                    selectedValue={Number(item.office_allotment_id)}
                                                    onSelect={(value: number): void =>
                                                        formHandler.setData(
                                                            'offices' as const,
                                                            formHandler.data.offices.map((x, i: number) =>
                                                                i === index ? { ...x, office_allotment_id: value } : x,
                                                            ),
                                                        )
                                                    }
                                                    onBlur={(): InertiaPrecognitiveFormProps<Obligation> =>
                                                        formHandler.validate((formHandler.errors as any)?.[`offices.${index}.office_allotment_id`])
                                                    }
                                                    data={officeAllotmentsGroupedBySection
                                                        .filter((section: Section): boolean => Number(section.id) === Number(item.section_id))
                                                        .flatMap((section: Section) =>
                                                            section.wfp_codes.map((wfp) => ({
                                                                id: wfp.id,
                                                                name: wfp.wfp_code,
                                                            })),
                                                        )}
                                                />
                                                {formHandler.invalid((formHandler.errors as any)?.[`offices.${index}.office_allotment_id`]) && (
                                                    <FieldError>{(formHandler.errors as any)?.[`offices.${index}.office_allotment_id`]}</FieldError>
                                                )}
                                            </Field>

                                            {/* Amount */}
                                            <Field data-invalid={!!(formHandler.errors as any)?.[`offices.${index}.amount`]}>
                                                <FieldLabel htmlFor={`amount-${index}`}>Amount</FieldLabel>
                                                <MoneyInput
                                                    name={`amount-${index}`}
                                                    id={`amount-${index}`}
                                                    allowNegativeValue={true}
                                                    invalid={!!(formHandler.errors as any)?.[`offices.${index}.amount`]}
                                                    value={String(item.amount ?? '')}
                                                    onValueChange={(value: string): void =>
                                                        formHandler.setData(
                                                            'offices' as const,
                                                            offices.map((x, i: number) => (i === index ? { ...x, amount: String(value ?? '') } : x)),
                                                        )
                                                    }
                                                />
                                                {formHandler.invalid((formHandler.errors as any)?.[`offices.${index}.amount`]) && (
                                                    <FieldError>{(formHandler.errors as any)?.[`offices.${index}.amount`]}</FieldError>
                                                )}
                                            </Field>
                                        </FieldGroup>

                                        {/* Remove button */}
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            type="button"
                                            className={cn('self-end', index === 0 ? 'disabled cursor-not-allowed opacity-50' : '')}
                                            onClick={() =>
                                                index !== 0 &&
                                                formHandler.setData(
                                                    'offices' as const,
                                                    formHandler.data.offices.filter((_, i) => i !== index),
                                                )
                                            }
                                        >
                                            <X />
                                        </Button>
                                    </ItemContent>
                                </Item>
                            ),
                        )}
                    </ItemContent>
                </Item>
            </FieldGroup>

            <Item className="mx-5 bg-accent-foreground px-5 pb-5">
                <ItemContent className="flex-row">
                    <ItemMedia variant="image" className="mr-2 border border-primary/50 bg-primary/30">
                        <Calculator className="text-primary" />
                    </ItemMedia>

                    <div>
                        <ItemDescription className="font-semibold">Consolidated Commitment</ItemDescription>
                        <ItemTitle className="text-3xl font-extrabold text-primary">{FormatMoney(totalAmount)}</ItemTitle>
                    </div>
                </ItemContent>
            </Item>
        </FieldSet>
    );
};

const TagObligation = (): JSX.Element => {
    const { formHandler } = useModalContext<Obligation>();
    const { obligations } = useObligationContext();

    const handleObligationChange = (selectedObligation: number): void => {
        formHandler.setData('tagged_obligation_id' as const, String(selectedObligation));
    };

    return (
        <Field data-invalid={!!formHandler.errors.tagged_obligation_id} className="mt-6">
            <FieldLabel htmlFor="tagged-obligation-id">Original Obligation</FieldLabel>
            <Combobox
                id="tagged-obligation-id"
                placeholder="Select Obligation"
                hasError={formHandler.errors.tagged_obligation_id}
                selectedValue={Number(formHandler.data.tagged_obligation_id)}
                onSelect={handleObligationChange}
                data={obligations.filter((obligation: Obligation): boolean => !obligation.norsa_type)}
            />
            {formHandler.invalid('tagged_obligation_id') && <FieldError>{formHandler.errors.tagged_obligation_id}</FieldError>}
        </Field>
    );
};

export default ObligationBaseForm;
