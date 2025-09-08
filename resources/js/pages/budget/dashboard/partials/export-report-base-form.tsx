import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type ExportReportBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const ExportReportBaseForm = ({ formHandler }: ExportReportBaseFormProps) => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));

    const years = (() => {
        const current = new Date().getFullYear();
        return Array.from({ length: 11 }, (_, i) => current - i);
    })();

    return (
        <FormField>
            <FormItem>
                <RadioGroup name="type" defaultValue="saob" className="border-input flex gap-0 rounded-md border">
                    <div className="flex w-full items-center gap-3 px-3">
                        <RadioGroupItem value="saob" id="saob" />
                        <Label htmlFor="saob" className="flex-1 py-3">
                            SAOB
                        </Label>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex w-full items-center gap-3 px-3">
                        <RadioGroupItem value="bur" id="bur" />
                        <Label htmlFor="bur" className="flex-1 py-3">
                            BUR
                        </Label>
                    </div>
                </RadioGroup>
            </FormItem>

            <FormField className="mt-0 grid-cols-2">
                <FormItem>
                    <Label htmlFor="month">Month</Label>
                    <Select name="month" value={String(formHandler.data.month)} onValueChange={(e) => formHandler.setData('month', e)}>
                        <SelectTrigger id="month" aria-invalid={formHandler.errors.month ? true : false}>
                            <SelectValue placeholder="Select Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={String(month)}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>

                <FormItem>
                    <Label htmlFor="year">Year</Label>
                    <Select name="year" value={String(formHandler.data.year)} onValueChange={(e) => formHandler.setData('year', e)}>
                        <SelectTrigger id="year" aria-invalid={formHandler.errors.year ? true : false}>
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            </FormField>
        </FormField>
    );
};

export default ExportReportBaseForm;
