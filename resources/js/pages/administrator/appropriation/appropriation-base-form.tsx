import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type AppropriationBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const AppropriationBaseForm = ({ formHandler }: AppropriationBaseFormProps) => {
    return (
        <FormField>
            <FormItem>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    autoComplete="off"
                    minLength={3}
                    maxLength={50}
                    required
                    autoFocus
                    placeholder="General Appropriation Act"
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
                    required
                    minLength={3}
                    maxLength={5}
                    autoComplete="off"
                    placeholder="GAA"
                    aria-invalid={formHandler.errors.acronym ? true : false}
                    value={String(formHandler.data.acronym)}
                    onChange={(e) => formHandler.setData('acronym', e.target.value)}
                />
                <InputError message={formHandler.errors.acronym} />
            </FormItem>
        </FormField>
    );
};

export default AppropriationBaseForm;
