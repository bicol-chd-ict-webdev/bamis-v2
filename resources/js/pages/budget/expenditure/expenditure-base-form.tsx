import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroupButton } from '@/components/ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAllotmentClassContext } from '@/contexts/allotment-class-context';
import { useModalContext } from '@/contexts/modal-context';
import type { AllotmentClass, Expenditure } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { ChangeEvent, JSX } from 'react';

const ExpenditureBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Expenditure>();
    const { allotmentClasses } = useAllotmentClassContext();

    return (
        <FieldSet>
            <FieldGroup className="p-5">
                <Field data-invalid={!!formHandler.errors.name}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        autoComplete="off"
                        required
                        placeholder="Basic Salary"
                        minLength={3}
                        maxLength={50}
                        aria-invalid={!!formHandler.errors.name}
                        value={String(formHandler.data.name ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('name', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Expenditure> => formHandler.validate('name')}
                    />
                    {formHandler.invalid('name') && <FieldError>{formHandler.errors.name}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.code}>
                    <FieldLabel htmlFor="code" className="items-center">
                        Code
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InputGroupButton className="rounded-full" size="icon-xs">
                                    <Info className="text-muted-foreground" />
                                </InputGroupButton>
                            </TooltipTrigger>
                            <TooltipContent>
                                Only the following characters are allowed:
                                <ul className="mt-1 list-inside list-disc">
                                    <li>
                                        Numbers{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(0-9)</code>
                                        </span>
                                    </li>
                                </ul>
                            </TooltipContent>
                        </Tooltip>
                    </FieldLabel>
                    <Input
                        id="code"
                        name="code"
                        required
                        autoComplete="off"
                        placeholder="5010101001"
                        minLength={10}
                        maxLength={10}
                        aria-invalid={!!formHandler.errors.code}
                        value={String(formHandler.data.code ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('code', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Expenditure> => formHandler.validate('code')}
                    />
                    {formHandler.invalid('code') && <FieldError>{formHandler.errors.code}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.allotment_class_id}>
                    <FieldLabel htmlFor="allotment-class-id">Allotment Class</FieldLabel>
                    <Select
                        name="allotment_class_id"
                        value={formHandler.data.allotment_class_id === 0 ? '' : String(formHandler.data.allotment_class_id)}
                        onValueChange={(value: string): void => formHandler.setData('allotment_class_id', Number(value))}
                        disabled={allotmentClasses.length < 1}
                    >
                        <SelectTrigger
                            id="allotment-class-id"
                            aria-invalid={!!formHandler.errors.allotment_class_id}
                            onBlur={(): InertiaPrecognitiveFormProps<Expenditure> => formHandler.validate('allotment_class_id')}
                        >
                            <SelectValue placeholder="Choose allotment class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Allotment Classes</SelectLabel>
                                {allotmentClasses.map(
                                    (allotmentClass: AllotmentClass): JSX.Element => (
                                        <SelectItem key={allotmentClass.id} value={String(allotmentClass.id)}>
                                            {allotmentClass.name}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formHandler.invalid('allotment_class_id') && <FieldError>{formHandler.errors.allotment_class_id}</FieldError>}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default ExpenditureBaseForm;
