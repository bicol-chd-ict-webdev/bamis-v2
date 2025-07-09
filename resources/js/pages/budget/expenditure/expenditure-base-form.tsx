import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import HoverInstruction from '@/components/hover-instruction';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormDefaults } from '@/contexts/modal-context';
import { type AllotmentClass } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';

type ExpenditureBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
    allotmentClasses: AllotmentClass[];
};

const ExpenditureBaseForm = ({ formHandler, allotmentClasses }: ExpenditureBaseFormProps) => {
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
                    placeholder="Basic Salary"
                    minLength={3}
                    maxLength={50}
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
                    placeholder="5010101001"
                    minLength={10}
                    maxLength={10}
                    aria-invalid={formHandler.errors.code ? true : false}
                    value={String(formHandler.data.code)}
                    onChange={(e) => formHandler.setData('code', e.target.value)}
                />
                <InputError message={formHandler.errors.code} />
            </FormItem>

            <FormItem>
                <Label htmlFor="allotment-class-id">Allotment Class</Label>
                <Select
                    name="allotment_class_id"
                    value={String(formHandler.data.allotment_class_id)}
                    onValueChange={(e) => formHandler.setData('allotment_class_id', e)}
                >
                    <SelectTrigger id="allotment-class-id" aria-invalid={formHandler.errors.allotment_class_id ? true : false}>
                        <SelectValue placeholder="Select Allotment Class" />
                    </SelectTrigger>
                    <SelectContent>
                        {allotmentClasses.map((allotmentClass) => (
                            <SelectItem key={allotmentClass.id} value={String(allotmentClass.id)}>
                                {allotmentClass.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.allotment_class_id} />
            </FormItem>
        </FormField>
    );
};

export default ExpenditureBaseForm;
