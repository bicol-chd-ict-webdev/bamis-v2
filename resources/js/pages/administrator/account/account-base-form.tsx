import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAccountRoleContext } from '@/contexts/account-role-context';
import { useModalContext } from '@/contexts/modal-context';
import { Role, User } from '@/types';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { ChangeEvent, JSX } from 'react';

const AccountBaseForm = (): JSX.Element => {
    const { formHandler } = useModalContext<User>();
    const { roles } = useAccountRoleContext();

    return (
        <FieldSet className="divide-y divide-border">
            <FieldGroup className="p-5">
                <Field data-invalid={!!formHandler.errors.name}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        required
                        autoComplete="off"
                        minLength={3}
                        maxLength={75}
                        placeholder="John S. Doe"
                        aria-invalid={!!formHandler.errors.name}
                        value={String(formHandler.data.name ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('name', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<User> => formHandler.validate('name')}
                    />
                    {formHandler.invalid('name') && <FieldError>{formHandler.errors.name}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="off"
                        minLength={3}
                        maxLength={50}
                        placeholder="email@example.com"
                        aria-invalid={!!formHandler.errors.email}
                        value={String(formHandler.data.email ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('email', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<User> => formHandler.validate('email')}
                    />
                    {formHandler.invalid('email') && <FieldError>{formHandler.errors.email}</FieldError>}
                </Field>

                <Field data-invalid={!!formHandler.errors.designation}>
                    <FieldLabel htmlFor="designation">Designation</FieldLabel>
                    <Input
                        id="designation"
                        name="designation"
                        required
                        autoComplete="off"
                        minLength={3}
                        maxLength={50}
                        placeholder="Computer Programmer II"
                        aria-invalid={!!formHandler.errors.designation}
                        value={String(formHandler.data.designation ?? '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => formHandler.setData('designation', e.target.value)}
                        onBlur={(): InertiaPrecognitiveFormProps<User> => formHandler.validate('designation')}
                    />
                    {formHandler.invalid('designation') && <FieldError>{formHandler.errors.designation}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="px-5 pb-5">
                <Field data-invalid={!!formHandler.errors.role}>
                    <FieldContent>
                        <FieldLabel htmlFor="role">Role</FieldLabel>
                        <FieldDescription>Choose a role to define access level and permissions within the system.</FieldDescription>
                    </FieldContent>
                    <Select
                        name="role"
                        value={String(formHandler.data.role ?? '')}
                        onValueChange={(value: string): void => formHandler.setData('role', value)}
                    >
                        <SelectTrigger
                            id="role-id"
                            className="capitalize"
                            aria-invalid={!!formHandler.errors.role}
                            onBlur={(): InertiaPrecognitiveFormProps<User> => formHandler.validate('role')}
                        >
                            <SelectValue placeholder="Choose role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Roles</SelectLabel>
                                {roles.map(
                                    (role: Role): JSX.Element => (
                                        <SelectItem key={role.id} value={String(role.name)} className="capitalize">
                                            {role.name}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formHandler.invalid('role') && <FieldError>{formHandler.errors.role}</FieldError>}
                </Field>
            </FieldGroup>

            <FieldGroup className="px-5 pb-5">
                <Field orientation="horizontal" className="items-center!" data-invalid={!!formHandler.errors.status}>
                    <FieldContent>
                        <FieldLabel htmlFor="status">Status</FieldLabel>
                        <FieldDescription>
                            Controls whether this account is active in the system. Inactive accounts will not have login access.
                        </FieldDescription>
                        <FieldError>{formHandler.errors.status}</FieldError>
                    </FieldContent>
                    <Switch
                        id="status"
                        name="status"
                        value={formHandler.data.status === 'active' ? 'on' : 'off'}
                        checked={formHandler.data.status === 'active'}
                        onCheckedChange={(checked: boolean): void => formHandler.setData('status', checked ? 'active' : 'inactive')}
                    />
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

export default AccountBaseForm;
