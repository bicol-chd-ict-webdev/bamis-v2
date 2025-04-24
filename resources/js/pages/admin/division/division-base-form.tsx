import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type DivisionBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const DivisionBaseForm = ({ formHandler }: DivisionBaseFormProps) => {
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
                    placeholder="Management Support Division"
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
