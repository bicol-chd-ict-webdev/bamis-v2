import FormItem from '@/components/form-div';
import FormField from '@/components/form-field';
import HoverInstruction from '@/components/hover-instruction';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type ProgramBaseFormProps = {
    appropriationSources: [];
    prexcs: [];
    formHandler: InertiaFormProps<FormDefaults>;
};

const ProgramBaseForm = ({ formHandler, appropriationSources, prexcs }: ProgramBaseFormProps) => {
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
                    placeholder="Health Policy and Standards Development Program"
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
                    placeholder="1101407"
                    minLength={7}
                    maxLength={7}
                    aria-invalid={formHandler.errors.code ? true : false}
                    value={String(formHandler.data.code)}
                    onChange={(e) => formHandler.setData('code', e.target.value)}
                />
                <InputError message={formHandler.errors.code} />
            </FormItem>

            <FormItem>
                <Label htmlFor="appropriation-source">Appropriation Source</Label>
                <Select
                    name="appropriation_source"
                    value={String(formHandler.data.appropriation_source)}
                    onValueChange={(e) => formHandler.setData('appropriation_source', e)}
                >
                    <SelectTrigger id="appropriation-source" aria-invalid={formHandler.errors.appropriation_source ? true : false}>
                        <SelectValue placeholder="Select Appropriation Source" />
                    </SelectTrigger>
                    <SelectContent>
                        {appropriationSources.map((appropriationSource) => (
                            <SelectItem key={appropriationSource} value={String(appropriationSource)}>
                                {appropriationSource}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.appropriation_source} />
            </FormItem>

            <FormItem>
                <Label htmlFor="prexc">Prexc</Label>
                <Select name="prexc" value={String(formHandler.data.prexc)} onValueChange={(e) => formHandler.setData('prexc', e)}>
                    <SelectTrigger id="prexc" aria-invalid={formHandler.errors.prexc ? true : false}>
                        <SelectValue placeholder="Select Prexc" />
                    </SelectTrigger>
                    <SelectContent>
                        {prexcs.map((prexc) => (
                            <SelectItem key={prexc} value={String(prexc)}>
                                {prexc}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.prexc} />
            </FormItem>
        </FormField>
    );
};

export default ProgramBaseForm;
