import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroupButton } from '@/components/ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppropriationSourceContext } from '@/contexts/appropriation-source-context';
import { useModalContext } from '@/contexts/modal-context';
import { useProgramClassificationContext } from '@/contexts/program-classification-context';
import { AppropriationSourceEnum, Program, ProgramClassification } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { ChangeEvent, JSX } from 'react';

const ProgramBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<Program>();
    const { appropriationSources } = useAppropriationSourceContext();
    const { programClassifications } = useProgramClassificationContext();

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
                        placeholder="Health Policy and Standards Development Program"
                        minLength={3}
                        maxLength={50}
                        aria-invalid={!!formHandler.errors.name}
                        value={String(formHandler.data.name ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('name', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Program> => formHandler.validate('name')}
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
                        placeholder="1101407"
                        minLength={7}
                        maxLength={7}
                        aria-invalid={!!formHandler.errors.code}
                        value={String(formHandler.data.code ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('code', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<Program> => formHandler.validate('code')}
                    />
                    {formHandler.invalid('code') && <FieldError>{formHandler.errors.code}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.appropriation_source}>
                    <FieldLabel htmlFor="appropriation-source">Appropriation Source</FieldLabel>
                    <Select
                        name="appropriation_source"
                        value={String(formHandler.data.appropriation_source ?? '')}
                        onValueChange={(value: string): void => formHandler.setData('appropriation_source', value)}
                    >
                        <SelectTrigger
                            id="appropriation-source"
                            aria-invalid={!!formHandler.errors.appropriation_source}
                            onBlur={(): InertiaPrecognitiveFormProps<Program> => formHandler.validate('appropriation_source')}
                        >
                            <SelectValue placeholder="Choose appropriation source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Appropriation Sources</SelectLabel>
                                {appropriationSources.map(
                                    (appropriationSource: AppropriationSourceEnum): JSX.Element => (
                                        <SelectItem key={appropriationSource.value} value={String(appropriationSource.value)}>
                                            {appropriationSource.value}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formHandler.invalid('appropriation_source') && <FieldError>{formHandler.errors.appropriation_source}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.program_classification_id}>
                    <FieldLabel htmlFor="program-classification-id">Program Classification</FieldLabel>
                    <Select
                        name="program_classification_id"
                        value={formHandler.data.program_classification_id === 0 ? '' : String(formHandler.data.program_classification_id)}
                        onValueChange={(value: string): void => formHandler.setData('program_classification_id', Number(value))}
                        disabled={programClassifications.length < 1}
                    >
                        <SelectTrigger
                            id="program-classification-id"
                            aria-invalid={!!formHandler.errors.program_classification_id}
                            onBlur={(): InertiaPrecognitiveFormProps<Program> => formHandler.validate('program_classification_id')}
                        >
                            <SelectValue placeholder="Choose program classification" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Program Classifications</SelectLabel>
                                {programClassifications.map(
                                    (programClassification: ProgramClassification): JSX.Element => (
                                        <SelectItem key={programClassification.id} value={String(programClassification.id)}>
                                            {programClassification.name}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formHandler.invalid('program_classification_id') && <FieldError>{formHandler.errors.program_classification_id}</FieldError>}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default ProgramBaseForm;
