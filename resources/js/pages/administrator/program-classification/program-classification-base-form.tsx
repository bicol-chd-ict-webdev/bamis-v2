import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import HoverInstruction from '@/components/hover-instruction';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type ProgramClassificationBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const ProgramClassificationBaseForm = ({ formHandler }: ProgramClassificationBaseFormProps) => {
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
                    minLength={3}
                    maxLength={100}
                    placeholder="OO : Access to social health protection assured"
                    aria-invalid={formHandler.errors.name ? true : false}
                    value={String(formHandler.data.name)}
                    onChange={(e) => formHandler.setData('name', e.target.value)}
                />
                <InputError message={formHandler.errors.name} />
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
                    placeholder="310000000000000"
                    maxLength={15}
                    aria-invalid={formHandler.errors.code ? true : false}
                    value={formHandler.data.code === 0 ? '' : String(formHandler.data.code)}
                    onChange={(e) => formHandler.setData('code', e.target.value)}
                />
                <InputError message={formHandler.errors.code} />
            </FormItem>
        </FormField>
    );
};

export default ProgramClassificationBaseForm;
