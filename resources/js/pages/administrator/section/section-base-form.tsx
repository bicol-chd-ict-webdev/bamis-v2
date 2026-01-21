import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroupButton } from '@/components/ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useDivisionContext } from '@/contexts/division-context';
import { useModalContext } from '@/contexts/modal-context';
import { Division, Section } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { ChangeEvent, JSX } from 'react';

const SectionBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Section>();
    const { divisions } = useDivisionContext();

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
                        placeholder="Human Resource Management Unit"
                        aria-invalid={!!formHandler.errors.name}
                        value={String(formHandler.data.name ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('name', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Section> => formHandler.validate('name')}
                    />
                    {formHandler.invalid('name') && <FieldError>{formHandler.errors.name}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-3 px-5">
                <Field data-invalid={!!formHandler.errors.acronym} className="col-span-2">
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
                                        Slash{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>/</code>)
                                        </span>
                                    </li>
                                    <li>
                                        Hyphen{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>-</code>)
                                        </span>
                                    </li>
                                    <li>
                                        Space{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>SPACE</code>)
                                        </span>
                                    </li>
                                </ul>
                            </TooltipContent>
                        </Tooltip>
                    </FieldLabel>
                    <Input
                        id="acronym"
                        name="acronym"
                        autoComplete="off"
                        minLength={3}
                        maxLength={25}
                        required
                        placeholder="HRMU"
                        aria-invalid={!!formHandler.errors.acronym}
                        value={String(formHandler.data.acronym ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('acronym', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Section> => formHandler.validate('acronym')}
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
                                        Uppercase letters{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            <code>(A-Z)</code>
                                        </span>
                                    </li>
                                    <li>
                                        Numbers{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>0-9</code>)
                                        </span>
                                    </li>
                                    <li>
                                        Period{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>.</code>)
                                        </span>
                                    </li>
                                    <li>
                                        Space{' '}
                                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>SPACE</code>)
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
                        minLength={1}
                        maxLength={10}
                        required
                        placeholder="A.1"
                        aria-invalid={!!formHandler.errors.code}
                        value={String(formHandler.data.code ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('code', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Section> => formHandler.validate('code')}
                    />
                    {formHandler.invalid('code') && <FieldError>{formHandler.errors.code}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="px-5 pb-5">
                <Field data-invalid={!!formHandler.errors.division_id}>
                    <FieldLabel htmlFor="division-id">Division</FieldLabel>
                    <Select
                        name="division_id"
                        value={formHandler.data.division_id === 0 ? '' : String(formHandler.data.division_id)}
                        onValueChange={(value: string): void => formHandler.setData('division_id', Number(value))}
                        disabled={divisions.length < 1}
                    >
                        <SelectTrigger
                            id="division-id"
                            aria-invalid={!!formHandler.errors.division_id}
                            onBlur={(): InertiaPrecognitiveFormProps<Section> => formHandler.validate('division_id')}
                        >
                            <SelectValue placeholder="Choose division" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Divisions</SelectLabel>
                                {divisions.map(
                                    (division: Division): JSX.Element => (
                                        <SelectItem key={division.id} value={String(division.id)}>
                                            {division.name}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formHandler.invalid('division_id') && <FieldError>{formHandler.errors.division_id}</FieldError>}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default SectionBaseForm;
