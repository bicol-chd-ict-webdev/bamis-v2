import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroupButton } from '@/components/ui/input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useModalContext } from '@/contexts/modal-context';
import type { LineItem } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { ChangeEvent, JSX } from 'react';

const LineItemBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<LineItem>();

    return (
        <FieldSet>
            <FieldGroup className="px-5 pt-5">
                <Field data-invalid={!!formHandler.errors.name}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        autoComplete="off"
                        minLength={3}
                        maxLength={100}
                        required
                        placeholder="Operations of Regional Offices"
                        aria-invalid={!!formHandler.errors.name}
                        value={String(formHandler.data.name ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('name', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<LineItem> => formHandler.validate('name')}
                    />
                    {formHandler.invalid('name') && <FieldError>{formHandler.errors.name}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-2 px-5 pb-5">
                <Field data-invalid={!!formHandler.errors.acronym}>
                    <FieldLabel htmlFor="acronym" className="items-center">
                        Acronym
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
                                        Uppercase letters{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(A-Z)</code>
                                        </span>
                                    </li>
                                    <li>
                                        Numbers{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(0-9)</code>
                                        </span>
                                    </li>
                                    <li>
                                        Slash{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(/)</code>
                                        </span>
                                    </li>
                                    <li>
                                        Hyphen{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(-)</code>
                                        </span>
                                    </li>
                                    <li>
                                        Ampersand{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(&)</code>
                                        </span>
                                    </li>
                                    <li>
                                        Space{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(SPACE)</code>
                                        </span>
                                    </li>
                                </ul>
                            </TooltipContent>
                        </Tooltip>
                    </FieldLabel>
                    <Input
                        id="acronym"
                        name="acronym"
                        required
                        minLength={2}
                        maxLength={20}
                        autoComplete="off"
                        placeholder="GAS-ORO"
                        aria-invalid={!!formHandler.errors.acronym}
                        value={String(formHandler.data.acronym ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('acronym', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<LineItem> => formHandler.validate('acronym')}
                    />
                    {formHandler.invalid('acronym') && <FieldError>{formHandler.errors.acronym}</FieldError>}
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
                        minLength={7}
                        maxLength={15}
                        autoComplete="off"
                        placeholder="200000100002000"
                        aria-invalid={!!formHandler.errors.code}
                        value={String(formHandler.data.code ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('code', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<LineItem> => formHandler.validate('code')}
                    />
                    {formHandler.invalid('code') && <FieldError>{formHandler.errors.code}</FieldError>}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default LineItemBaseForm;
