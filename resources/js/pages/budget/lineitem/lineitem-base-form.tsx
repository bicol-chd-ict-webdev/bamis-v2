import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
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
                    autoComplete="on"
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
                    <Label htmlFor="acronym">Acronym</Label>
                    <Input
                        id="acronym"
                        name="acronym"
                        required
                        placeholder="GAS-ORO"
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
                        maxLength={15}
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
