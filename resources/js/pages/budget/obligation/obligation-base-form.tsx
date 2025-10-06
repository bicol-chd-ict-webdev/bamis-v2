import Combobox from '@/components/combobox';
import { DatePicker } from '@/components/date-picker';
import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import InputError from '@/components/input-error';
import { MoneyInput } from '@/components/money-input';
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
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { FormatMoney } from '@/lib/formatter';

type ObligationBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const ObligationBaseForm = ({ formHandler }: ObligationBaseFormProps) => {
    const { allocation, obligations, objectDistributions, recipients, norsaTypes, sections } = useObligationContext();

    const handleObjectDistributionChange = (selectedObjectDistribution: number) => {
        formHandler.setData('object_distribution_id', selectedObjectDistribution);
    };

    const handleObligationChange = (selectedObligation: number) => {
        formHandler.setData('tagged_obligation_id', selectedObligation);
    }

    const offices = Array.isArray(formHandler.data.offices)
        ? formHandler.data.offices
        : formHandler.data.offices
            ? [formHandler.data.offices]
            : [];

    const totalAmount = offices.reduce((sum, office) => sum + Number(office.amount || 0), 0);

    return (
           <Tabs defaultValue="details" className="grid">
               <TabsList>
                   <TabsTrigger value="details" className="w-full">Details</TabsTrigger>
                    <TabsTrigger value="office" className="w-full">Office</TabsTrigger>
                    <TabsTrigger value="norsa" className="w-full">Norsa</TabsTrigger>
                   <TabsTrigger value="transfer" className="w-full">Transfer</TabsTrigger>
               </TabsList>
               <TabsContent value="details">
                   <Card>
                       <CardContent>
                           <FormField className="mt-0">
                               <FormField className="mt-0 grid-cols-2">
                                   <FormItem>
                                       <Label htmlFor="series">Series</Label>
                                       <Input
                                           id="series"
                                           name="series"
                                           autoComplete="off"
                                           minLength={4}
                                           maxLength={5}
                                           placeholder="0002"
                                           aria-invalid={!!formHandler.errors.series}
                                           value={formHandler.data.series ? String(formHandler.data.series) : ''}
                                           onChange={(e) => formHandler.setData('series', e.target.value)}
                                       />
                                       <InputError message={formHandler.errors.series} />
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
                           </FormField>
                       </CardContent>
                   </Card>
               </TabsContent>
               <TabsContent value="office">
                   <Card>
                       <CardContent>
                           {offices.map((item, index) => (
                               <FormField key={index} className="flex gap-3 first:mt-0">
                                   {/* Remove button */}
                                   <Button
                                       variant="destructive"
                                       type="button"
                                       className={cn(
                                           "size-6 mt-7",
                                           index === 0 ? "disabled cursor-not-allowed opacity-50" : ""
                                       )}
                                       onClick={() =>
                                           index !== 0 &&
                                           formHandler.setData(
                                               "offices",
                                               formHandler.data.offices.filter((_, i) => i !== index)
                                           )
                                       }
                                   >
                                       <X />
                                   </Button>

                                   <FormField className="grid-cols-3 mt-0">
                                       {/* Office */}
                                       <FormItem>
                                           <Label htmlFor={`section-id-${index}`}>Office</Label>
                                           <Combobox
                                               id={`section-id-${index}`}
                                               placeholder="Select Office"
                                               hasError={formHandler.errors?.[`offices.${index}.section_id`]}
                                               selectedValue={Number(item.section_id)}
                                               onSelect={(value) =>
                                                   formHandler.setData(
                                                       "offices",
                                                       offices.map((x, i) =>
                                                           i === index ? { ...x, section_id: value } : x
                                                       )
                                                   )
                                               }
                                               data={sections}
                                           />
                                           <InputError message={formHandler.errors?.[`offices.${index}.section_id`]} />
                                       </FormItem>

                                       {/* WFP Code */}
                                       <FormItem>
                                           <Label htmlFor={`office-allotment-id-${index}`}>WFP Code</Label>
                                           <Combobox
                                               id={`office-allotment-id-${index}`}
                                               placeholder="Select Code"
                                               hasError={formHandler.errors?.[`offices.${index}.office_allotment_id`]}
                                               selectedValue={Number(item.office_allotment_id)}
                                               onSelect={(value) =>
                                                   formHandler.setData(
                                                       "offices",
                                                       formHandler.data.offices.map((x, i) =>
                                                           i === index ? { ...x, office_allotment_id: value } : x
                                                       )
                                                   )
                                               }
                                               data={sections
                                                   .filter((section) => Number(section.id) === Number(item.section_id))
                                                   .flatMap((section) =>
                                                       section.wfp_codes.map((wfp) => ({
                                                           id: wfp.id,
                                                           name: wfp.wfp_code,
                                                       }))
                                                   )}
                                           />
                                           <InputError message={formHandler.errors?.[`offices.${index}.office_allotment_id`]} />
                                       </FormItem>

                                       {/* Amount */}
                                       <FormItem>
                                           <Label htmlFor={`amount-${index}`}>Amount</Label>
                                           <MoneyInput
                                               id={`amount-${index}`}
                                               allowNegativeValue={true}
                                               invalid={!!formHandler.errors?.[`offices.${index}.amount`]}
                                               value={String(item.amount) ?? ""}
                                               onValueChange={(value) =>
                                                   formHandler.setData(
                                                       "offices",
                                                       offices.map((x, i) =>
                                                           i === index ? { ...x, amount: String(value) ?? "" } : x
                                                       )
                                                   )
                                               }
                                           />
                                           <InputError message={formHandler.errors?.[`offices.${index}.amount`]} />
                                       </FormItem>
                                   </FormField>
                               </FormField>
                           ))}

                           <div className="flex justify-between items-center mt-6 border-t border-t-border px-3 pt-1">
                               <p>Total Amount:</p>
                               <p className="font-semibold text-primary text-lg">{FormatMoney(totalAmount)}</p>
                           </div>

                           {/* Add office allotment */}
                           {!formHandler.data.id && <Button
                               variant="outline"
                               type="button"
                               className="border-2 border-dashed w-full mt-6"
                               onClick={() =>
                                   formHandler.setData("offices", [
                                       ...formHandler.data.offices,
                                       { office_allotment_id: 0, section_id: 0, amount: "" },
                                   ])
                               }
                           >
                               <Plus />
                               Office
                           </Button>}
                       </CardContent>
                   </Card>
               </TabsContent>
               <TabsContent value="norsa">
                   <Card>
                       <CardContent>
                           <FormField className="mt-0">
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

                               {formHandler.data.norsa_type && <FormItem>
                                   <Label htmlFor="tagged-obligation-id">Original Obligation</Label>
                                   <Combobox
                                       id="tagged-obligation-id"
                                       placeholder="Select Obligation"
                                       hasError={formHandler.errors.tagged_obligation_id}
                                       selectedValue={Number(formHandler.data.tagged_obligation_id)}
                                       onSelect={handleObligationChange}
                                       data={obligations.filter((ob) => !ob.norsa_type)}
                                   />
                                   <InputError message={formHandler.errors.tagged_obligation_id} />
                               </FormItem>}
                           </FormField>
                       </CardContent>
                   </Card>
               </TabsContent>
               <TabsContent value="transfer">
                   <Card>
                       <CardContent>
                           <FormField className="mt-0">
                               <FormItem>
                                   <Label htmlFor="is-transferred" className="flex items-center">
                                       <Switch
                                           id="is-transferred"
                                           name="is_transferred"
                                           value={formHandler.data.is_transferred ? 'on' : 'off'}
                                           checked={!!formHandler.data.is_transferred}
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
                       </CardContent>
                   </Card>
               </TabsContent>
           </Tabs>
    );
};

export default ObligationBaseForm;
