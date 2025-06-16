import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormDefaults } from '@/contexts/modal-context';
import { type Division } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { CircleHelp } from 'lucide-react';

type SectionBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
    divisions: Division[];
};

const SectionBaseForm = ({ formHandler, divisions }: SectionBaseFormProps) => {
    return (
        <FormField>
            <FormItem>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    autoComplete="off"
                    required
                    autoFocus
                    placeholder="Human Resource Management Unit"
                    aria-invalid={formHandler.errors.name ? true : false}
                    value={String(formHandler.data.name)}
                    onChange={(e) => formHandler.setData('name', e.target.value)}
                />
                <InputError message={formHandler.errors.name} />
            </FormItem>

            <div className="grid grid-cols-2 place-items-start gap-6">
                <FormItem>
                    <div className="flex items-center space-x-1">
                        <Label htmlFor="acronym">Acronym</Label>
                        <HoverCard>
                            <HoverCardTrigger>
                                <CircleHelp className="text-muted-foreground size-4 cursor-pointer" />
                            </HoverCardTrigger>
                            <HoverCardContent align="start" className="max-w-xs text-sm">
                                Only the following characters are allowed:
                                <ul className="mt-1 list-inside list-disc">
                                    <li>
                                        Uppercase letters <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">(A-Z)</span>
                                    </li>
                                    <li>
                                        Slash
                                        <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>/</code>)
                                        </span>
                                    </li>
                                    <li>
                                        Hyphen{' '}
                                        <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (<code>-</code>)
                                        </span>
                                    </li>
                                    <li>
                                        Space{' '}
                                        <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">
                                            (&nbsp;&nbsp;&nbsp;&nbsp;)
                                        </span>
                                    </li>
                                </ul>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <Input
                        id="acronym"
                        name="acronym"
                        required
                        placeholder="HRMU"
                        autoComplete="off"
                        aria-invalid={formHandler.errors.acronym ? true : false}
                        value={String(formHandler.data.acronym)}
                        onChange={(e) => formHandler.setData('acronym', e.target.value)}
                    />
                    <InputError message={formHandler.errors.acronym} />
                </FormItem>

                <FormItem>
                    <Label htmlFor="code">Code</Label>
                    <Input
                        id="code"
                        name="code"
                        required
                        placeholder="A.1"
                        autoComplete="off"
                        aria-invalid={formHandler.errors.code ? true : false}
                        value={String(formHandler.data.code)}
                        onChange={(e) => formHandler.setData('code', e.target.value)}
                    />
                    <InputError message={formHandler.errors.code} />
                </FormItem>
            </div>

            <FormItem>
                <Label htmlFor="division-id">Division</Label>
                <Select name="division_id" value={String(formHandler.data.division_id)} onValueChange={(e) => formHandler.setData('division_id', e)}>
                    <SelectTrigger id="division-id" aria-invalid={formHandler.errors.division_id ? true : false}>
                        <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                        {divisions.map((division) => (
                            <SelectItem key={division.id} value={String(division.id)}>
                                {division.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.division_id} />
            </FormItem>
        </FormField>
    );
};

export default SectionBaseForm;
