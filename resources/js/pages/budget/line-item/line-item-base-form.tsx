import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import HoverInstruction from '@/components/hover-instruction';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type LineItemBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const LineItemBaseForm = ({ formHandler }: LineItemBaseFormProps) => {
    return (
        <FormField>
            <FormItem>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    autoComplete="off"
                    minLength={3}
                    maxLength={100}
                    required
                    autoFocus
                    placeholder="Operations of Regional Offices"
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
                                { label: 'Numbers', hint: <code>0-9</code> },
                                { label: 'Slash', hint: <code>/</code> },
                                { label: 'Hyphen', hint: <code>-</code> },
                                { label: 'Ampersand', hint: <code>&</code> },
                                { label: 'Space', hint: <code>SPACE</code> },
                            ]}
                        />
                    </div>
                    <Input
                        id="acronym"
                        name="acronym"
                        required
                        minLength={2}
                        maxLength={20}
                        autoComplete="off"
                        placeholder="GAS-ORO"
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
                            items={[{ label: 'Numbers', hint: <code>0-9</code> }]}
                        />
                    </div>
                    <Input
                        id="code"
                        name="code"
                        required
                        minLength={7}
                        maxLength={15}
                        autoComplete="off"
                        placeholder="200000100002000"
                        aria-invalid={formHandler.errors.code ? true : false}
                        value={String(formHandler.data.code)}
                        onChange={(e) => formHandler.setData('code', e.target.value)}
                    />
                    <InputError message={formHandler.errors.code} />
                </FormItem>
            </div>
        </FormField>
    );
};

export default LineItemBaseForm;
