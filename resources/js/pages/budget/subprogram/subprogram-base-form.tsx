import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroupButton } from '@/components/ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useModalContext } from '@/contexts/modal-context';
import { useProgramContext } from '@/contexts/program-context';
import type { Program, Subprogram } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { ChangeEvent, JSX } from 'react';

const SubprogramBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Subprogram>();
    const { programs } = useProgramContext();

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
                        placeholder="Service Delivery Sub-Program"
                        minLength={3}
                        maxLength={50}
                        aria-invalid={!!formHandler.errors.name}
                        value={String(formHandler.data.name ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('name', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Subprogram> => formHandler.validate('name')}
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
                        autoComplete="off"
                        placeholder="310201000000000"
                        minLength={15}
                        maxLength={15}
                        aria-invalid={!!formHandler.errors.code}
                        value={String(formHandler.data.code ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('code', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Subprogram> => formHandler.validate('code')}
                    />
                    {formHandler.invalid('code') && <FieldError>{formHandler.errors.code}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.program_id}>
                    <FieldLabel htmlFor="program-id">Program</FieldLabel>
                    <Select
                        name="program_id"
                        value={formHandler.data.program_id === 0 ? '' : String(formHandler.data.program_id)}
                        onValueChange={(value: string): void => formHandler.setData('program_id', Number(value))}
                        disabled={programs.length < 1}
                    >
                        <SelectTrigger
                            id="program-id"
                            aria-invalid={!!formHandler.errors.program_id}
                            onBlur={(): InertiaPrecognitiveFormProps<Subprogram> => formHandler.validate('program_id')}
                        >
                            <SelectValue placeholder="Choose program" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Program Classifications</SelectLabel>
                                {programs.map(
                                    (program: Program): JSX.Element => (
                                        <SelectItem key={program.id} value={String(program.id)}>
                                            {program.name}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formHandler.invalid('program_id') && <FieldError>{formHandler.errors.program_id}</FieldError>}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default SubprogramBaseForm;
