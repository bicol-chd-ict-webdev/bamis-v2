import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import HoverInstruction from '@/components/hover-instruction';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

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

            <div className="grid grid-cols-2 place-items-start gap-6">
                <FormItem>
                    <div className="flex items-center space-x-1">
                        <Label htmlFor="acronym">Acronym</Label>
                        <HoverInstruction
                            description="Only the following characters are allowed:"
                            items={[{ label: 'Uppercase letters', hint: <code>A-Z</code> }]}
                        />
                    </div>
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
                        <HoverInstruction
                            description="Only the following characters are allowed:"
                            items={[{ label: 'Numbers', hint: <code>0-9</code> }]}
                        />
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
            </div>
        </FormField>
    );
};

export default AllotmentClassBaseForm;
