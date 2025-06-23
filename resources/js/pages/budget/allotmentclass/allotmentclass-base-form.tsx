import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';
import { CircleHelp } from 'lucide-react';

type AllotmentClassBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const AllotmentClassBaseForm = ({ formHandler }: AllotmentClassBaseFormProps) => {
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
                    placeholder="Personnel Services"
                    aria-invalid={formHandler.errors.name ? true : false}
                    value={String(formHandler.data.name)}
                    onChange={(e) => formHandler.setData('name', e.target.value)}
                />
                <InputError message={formHandler.errors.name} />
            </FormItem>

            <FormItem>
                <Label htmlFor="acronym">Acronym</Label>
                <Input
                    id="acronym"
                    name="acronym"
                    autoComplete="off"
                    required
                    placeholder="PS"
                    aria-invalid={formHandler.errors.acronym ? true : false}
                    value={String(formHandler.data.acronym)}
                    onChange={(e) => formHandler.setData('acronym', e.target.value)}
                />
                <InputError message={formHandler.errors.acronym} />
            </FormItem>

            <FormItem>
                <div className="flex items-center space-x-1">
                    <Label htmlFor="code">Code</Label>
                    <HoverCard>
                        <HoverCardTrigger>
                            <CircleHelp className="text-muted-foreground size-4 cursor-pointer" />
                        </HoverCardTrigger>
                        <HoverCardContent align="start" className="max-w-xs text-sm">
                            Only the following characters are allowed:
                            <ul className="mt-1 list-inside list-disc">
                                <li>
                                    Numbers <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">(0-9)</span>
                                </li>
                            </ul>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Input
                    id="code"
                    name="code"
                    autoComplete="off"
                    required
                    placeholder="01"
                    aria-invalid={formHandler.errors.code ? true : false}
                    value={String(formHandler.data.code)}
                    onChange={(e) => formHandler.setData('code', e.target.value)}
                />
                <InputError message={formHandler.errors.code} />
            </FormItem>
        </FormField>
    );
};

export default AllotmentClassBaseForm;
