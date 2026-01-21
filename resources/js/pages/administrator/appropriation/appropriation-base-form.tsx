import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroupButton } from '@/components/ui/input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useModalContext } from '@/contexts/modal-context';
import { Appropriation } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { ChangeEvent, JSX } from 'react';

const AppropriationBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Appropriation>();

    return (
        <FieldSet>
            <FieldGroup className="p-5">
                <Field data-invalid={!!formHandler.errors.name}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        autoComplete="off"
                        minLength={3}
                        maxLength={50}
                        required
                        placeholder="General Appropriation Act"
                        aria-invalid={!!formHandler.errors.name}
                        value={String(formHandler.data.name ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('name', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Appropriation> => formHandler.validate('name')}
                    />
                    {formHandler.invalid('name') && <FieldError>{formHandler.errors.name}</FieldError>}
                </Field>

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
                                </ul>
                            </TooltipContent>
                        </Tooltip>
                    </FieldLabel>
                    <Input
                        id="acronym"
                        name="acronym"
                        required
                        minLength={3}
                        maxLength={5}
                        autoComplete="off"
                        placeholder="GAA"
                        aria-invalid={!!formHandler.errors.acronym}
                        value={String(formHandler.data.acronym ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('acronym', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Appropriation> => formHandler.validate('acronym')}
                    />
                    {formHandler.invalid('acronym') && <FieldError>{formHandler.errors.acronym}</FieldError>}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default AppropriationBaseForm;
