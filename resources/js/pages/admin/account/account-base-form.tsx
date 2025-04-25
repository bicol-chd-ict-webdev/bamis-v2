import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

const AccountBaseForm = ({ formHandler }: { formHandler: InertiaFormProps<FormDefaults> }) => {
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
                    placeholder="Juan Dela Cruz"
                    aria-invalid={formHandler.errors.name ? true : false}
                    value={String(formHandler.data.name)}
                    onChange={(e) => formHandler.setData('name', e.target.value)}
                />
                <InputError message={formHandler.errors.name} />
            </FormItem>

            <FormItem>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    autoComplete="on"
                    required
                    placeholder="juan.delacruz@example.com"
                    aria-invalid={formHandler.errors.email ? true : false}
                    value={String(formHandler.data.email)}
                    onChange={(e) => formHandler.setData('email', e.target.value)}
                />
                <InputError message={formHandler.errors.email} />
            </FormItem>

            <FormItem>
                <Label htmlFor="designation">Designation</Label>
                <Input
                    id="designation"
                    name="designation"
                    required
                    placeholder="Computer Programmer II"
                    aria-invalid={formHandler.errors.designation ? true : false}
                    value={String(formHandler.data.designation)}
                    onChange={(e) => formHandler.setData('designation', e.target.value)}
                />
                <InputError message={formHandler.errors.designation} />
            </FormItem>

            <div className="grid grid-cols-3 gap-6">
                <FormItem className="col-span-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" value={formHandler.data.role.toString()} onValueChange={(e) => formHandler.setData('role', e)}>
                        <SelectTrigger id="role" aria-invalid={formHandler.errors.role ? true : false}>
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Roles</SelectLabel>
                                <SelectItem value="admin">Administrator</SelectItem>
                                <SelectItem value="budget">Budget</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={formHandler.errors.role} />
                </FormItem>

                <FormItem className="place-self-start">
                    <Label htmlFor="status">Status</Label>
                    <div className="mt-2.5 flex">
                        <Switch
                            id="status"
                            name="status"
                            value={formHandler.data.status === 'Active' ? 'on' : 'off'}
                            checked={formHandler.data.status === 'Active' ? true : false}
                            onCheckedChange={(checked) => {
                                formHandler.setData('status', checked ? 'Active' : 'Inactive');
                            }}
                        />
                        <p className="ml-2 text-sm">{formHandler.data.status}</p>
                    </div>
                </FormItem>
            </div>
        </FormField>
    );
};

export default AccountBaseForm;
