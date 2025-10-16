import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import InputError from '@/components/input-error';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';
import { CircleHelp } from 'lucide-react';

const DivisionBaseForm = ({ formHandler }: { formHandler: InertiaFormProps<FormDefaults> }) => {
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
                    placeholder="Management Support Division"
                    aria-invalid={formHandler.errors.name ? true : false}
                    value={String(formHandler.data.name)}
                    onChange={(e) => formHandler.setData('name', e.target.value)}
                />
                <InputError message={formHandler.errors.name} />
            </FormItem>

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
                            </ul>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Input
                    id="acronym"
                    name="acronym"
                    required
                    autoComplete="off"
                    placeholder="MSD"
                    aria-invalid={formHandler.errors.acronym ? true : false}
                    value={String(formHandler.data.acronym)}
                    onChange={(e) => formHandler.setData('acronym', e.target.value)}
                />
                <InputError message={formHandler.errors.acronym} />
            </FormItem>
        </FormField>
    );
};

export default DivisionBaseForm;
