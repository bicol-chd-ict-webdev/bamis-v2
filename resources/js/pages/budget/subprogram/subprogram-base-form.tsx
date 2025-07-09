import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormDefaults } from '@/contexts/modal-context';
import { type Program } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';

type SubprogramBaseFormProps = {
    programs: Program[];
    formHandler: InertiaFormProps<FormDefaults>;
};

const SubprogramBaseForm = ({ formHandler, programs }: SubprogramBaseFormProps) => {
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
                    placeholder="Service Delivery Sub-Program"
                    minLength={3}
                    maxLength={50}
                    aria-invalid={formHandler.errors.name ? true : false}
                    value={String(formHandler.data.name)}
                    onChange={(e) => formHandler.setData('name', e.target.value)}
                />
                <InputError message={formHandler.errors.name} />
            </FormItem>

            <FormItem>
                <Label htmlFor="program-id">Program</Label>
                <Select name="program_id" value={String(formHandler.data.program_id)} onValueChange={(e) => formHandler.setData('program_id', e)}>
                    <SelectTrigger id="program-id" aria-invalid={formHandler.errors.program_id ? true : false}>
                        <SelectValue placeholder="Select Program" />
                    </SelectTrigger>
                    <SelectContent>
                        {programs.map((program) => (
                            <SelectItem key={program.id} value={String(program.id)}>
                                {program.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.program_id} />
            </FormItem>
        </FormField>
    );
};

export default SubprogramBaseForm;
