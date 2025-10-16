import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import HoverInstruction from '@/components/hover-instruction';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormDefaults } from '@/contexts/modal-context';
import { type Division } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';

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
                        <HoverInstruction
                            description="Only the following characters are allowed:"
                            items={[
                                { label: 'Uppercase letters', hint: <code>A-Z</code> },
                                { label: 'Slash', hint: <code>/</code> },
                                { label: 'Hyphen', hint: <code>-</code> },
                                { label: 'Space', hint: <code>SPACE</code> },
                            ]}
                        />
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
                    <div className="flex items-center space-x-1">
                        <Label htmlFor="code">Code</Label>
                        <HoverInstruction
                            description="Only the following characters are allowed:"
                            items={[
                                { label: 'Uppercase letters', hint: <code>A-Z</code> },
                                { label: 'Numbers', hint: <code>0-9</code> },
                                { label: 'Period', hint: <code>.</code> },
                                { label: 'Space', hint: <code>SPACE</code> },
                            ]}
                        />
                    </div>
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
                <Select
                    name="division_id"
                    value={formHandler.data.division_id ? String(formHandler.data.division_id) : undefined}
                    onValueChange={(e) => formHandler.setData('division_id', e)}
                >
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
