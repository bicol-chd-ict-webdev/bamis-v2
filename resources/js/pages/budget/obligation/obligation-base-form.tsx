import Combobox from '@/components/combobox';
import { DatePicker } from '@/components/date-picker';
import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { FormDefaults } from '@/contexts/modal-context';
import { useObligationContext } from '@/contexts/obligation-context';
import { cn } from '@/lib/utils';
import { InertiaFormProps } from '@inertiajs/react';

type ObligationBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const ObligationBaseForm = ({ formHandler }: ObligationBaseFormProps) => {
    const { allocation, obligations, objectDistributions, officeAllotments, recipients, norsaTypes } = useObligationContext();

    const handleObjectDistributionChange = (selectedObjectDistribution: number) => {
        formHandler.setData('object_distribution_id', selectedObjectDistribution);
    };

    const handleOfficeAllotmentChange = (selectedOfficeAllotment: number) => {
        formHandler.setData('office_allotment_id', selectedOfficeAllotment);
    };

    return (
        <FormField className="divide-input mt-0 grid-cols-2 place-items-start gap-0 divide-x">
            <FormField className="w-full pr-3">
                <FormField className="mt-0 grid-cols-2">
                    <FormItem>
                        <Label htmlFor="dtrak-number">Dtrak Number</Label>
                        <Input
                            id="dtrak-number"
                            name="dtrak_number"
                            autoComplete="off"
                            minLength={4}
                            maxLength={10}
                            placeholder="9397"
                            aria-invalid={!!formHandler.errors.dtrak_number}
                            value={formHandler.data.dtrak_number ? String(formHandler.data.dtrak_number) : ''}
                            onChange={(e) => formHandler.setData('dtrak_number', e.target.value)}
                        />
                        <InputError message={formHandler.errors.dtrak_number} />
                    </FormItem>

                    <FormItem>
                        <Label htmlFor="reference-number">Reference Number</Label>
                        <Input
                            id="reference-number"
                            name="reference_number"
                            autoComplete="off"
                            minLength={9}
                            maxLength={15}
                            placeholder="25-03-1025"
                            aria-invalid={!!formHandler.errors.reference_number}
                            value={formHandler.data.reference_number ? String(formHandler.data.reference_number) : ''}
                            onChange={(e) => formHandler.setData('reference_number', e.target.value)}
                        />
                        <InputError message={formHandler.errors.reference_number} />
                    </FormItem>
                </FormField>

                <FormField className="mt-0 grid-cols-2">
                    <FormItem>
                        <Label htmlFor="office-allotment-id">Office</Label>
                        <Combobox
                            id="office-allotment-id"
                            placeholder="Select Office"
                            hasError={formHandler.errors.office_allotment_id}
                            selectedValue={Number(formHandler.data.office_allotment_id)}
                            onSelect={handleOfficeAllotmentChange}
                            data={officeAllotments}
                        />
                        <InputError message={formHandler.errors.office_allotment_id} />
                    </FormItem>

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
                </FormField>

                <FormItem>
                    <Label htmlFor="object-distribution-id">Expenditure</Label>
                    <Combobox
                        id="object-distribution-id"
                        placeholder="Select Expenditure"
                        hasError={formHandler.errors.object_distribution_id}
                        selectedValue={Number(formHandler.data.object_distribution_id)}
                        onSelect={handleObjectDistributionChange}
                        data={objectDistributions}
                    />
                    <InputError message={formHandler.errors.object_distribution_id} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="amount">Amount</Label>
                    <MoneyInput
                        id="amount"
                        name="amount"
                        allowNegativeValue={true}
                        invalid={!!formHandler.errors.amount}
                        value={String(formHandler.data.amount) ?? ''}
                        onValueChange={(value) => formHandler.setData('amount', String(value) ?? '')}
                    />
                    <InputError message={formHandler.errors.amount} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="creditor">Creditor</Label>
                    <Input
                        id="creditor"
                        name="creditor"
                        autoComplete="off"
                        minLength={3}
                        maxLength={100}
                        placeholder="COS - Juan Dela Cruz"
                        aria-invalid={!!formHandler.errors.creditor}
                        value={String(formHandler.data.creditor)}
                        onChange={(e) => formHandler.setData('creditor', e.target.value)}
                    />
                    <InputError message={formHandler.errors.creditor} />
                </FormItem>
            </FormField>

            <FormField className="w-full pl-3">
                <FormItem>
                    <Label htmlFor="particulars">Particulars</Label>
                    <Textarea
                        id="particulars"
                        name="particulars"
                        autoComplete="off"
                        placeholder="Particulars"
                        className="h-auto min-h-[72px]"
                        aria-invalid={!!formHandler.errors.particulars}
                        value={String(formHandler.data.particulars)}
                        onChange={(e) => formHandler.setData('particulars', e.target.value)}
                    />
                    <InputError message={formHandler.errors.particulars} />
                </FormItem>

                <FormItem className={cn('border-input rounded-md border p-3', obligations.length < 1 && 'bg-muted cursor-not-allowed opacity-50')}>
                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id="batch-process"
                            name="batch-process"
                            checked={Boolean(formHandler.data.is_batch_process)}
                            onCheckedChange={(checked) => formHandler.setData('is_batch_process', checked === true)}
                            disabled={obligations.length < 1}
                        />
                        <Label htmlFor="batch-process" className="w-full space-y-1">
                            <p className="mb-1.5">Batch Process</p>
                            <p className="text-muted-foreground font-normal">Perform transactions through batch processing.</p>
                        </Label>
                    </div>
                </FormItem>

                <FormItem>
                    <RadioGroup
                        name="norsa_type"
                        value={String(formHandler.data.norsa_type)}
                        onValueChange={(value) => formHandler.setData('norsa_type', value)}
                        className="border-input grid grid-cols-2 gap-0 divide-x rounded-md border"
                    >
                        {norsaTypes.map((norsaType) => {
                            const isDisabled = Number(allocation.appropriation_type_id) === 1 && norsaType.name === 'PREVIOUS';

                            return (
                                <div key={norsaType.name} className={cn('flex items-start gap-3 p-3', isDisabled && 'bg-muted cursor-not-allowed')}>
                                    <RadioGroupItem value={norsaType.value} id={norsaType.name} disabled={isDisabled} />
                                    <Label
                                        htmlFor={norsaType.name}
                                        className={cn('flex w-full flex-col', isDisabled && 'bg-muted cursor-not-allowed')}
                                    >
                                        <span className={cn(isDisabled && 'text-muted-foreground')}>NORSA</span>
                                        <span className={cn('text-muted-foreground text-sm font-normal', isDisabled && 'text-stone-400')}>
                                            {norsaType.value}
                                        </span>
                                    </Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </FormItem>

                <FormItem>
                    <Label htmlFor="is-transferred" className="flex items-center">
                        <Switch
                            id="is-transferred"
                            name="is_transferred"
                            value={formHandler.data.is_transferred ? 'on' : 'off'}
                            checked={formHandler.data.is_transferred ? true : false}
                            onCheckedChange={(checked) => {
                                formHandler.setData('is_transferred', checked);

                                if (!checked) {
                                    formHandler.setData('recipient', '');
                                }
                            }}
                        />
                        <span className="ml-2 font-normal">Transfer to CO/OU's</span>
                    </Label>
                    <InputError message={formHandler.errors.is_transferred} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Select
                        name="recipient"
                        value={String(formHandler.data.recipient)}
                        onValueChange={(e) => formHandler.setData('recipient', e)}
                        disabled={!formHandler.data.is_transferred}
                    >
                        <SelectTrigger id="recipient" aria-invalid={!!formHandler.errors.recipient}>
                            <SelectValue placeholder="Select Recipient" />
                        </SelectTrigger>
                        {recipients && (
                            <SelectContent>
                                {recipients.map((recipient) => (
                                    <SelectItem key={recipient.value} value={String(recipient.value)}>
                                        {recipient.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                    <InputError message={formHandler.errors.recipient} />
                </FormItem>
            </FormField>
        </FormField>
    );
};

export default ObligationBaseForm;
