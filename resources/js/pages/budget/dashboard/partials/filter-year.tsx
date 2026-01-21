import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboard } from '@/routes';
import { InertiaFormProps, router } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

type FilterYearBaseFormProps = {
    formHandler: InertiaFormProps<{ year: string }>;
};

const FilterYear = ({ formHandler }: FilterYearBaseFormProps) => {
    const years = (() => {
        const current = new Date().getFullYear();
        return Array.from({ length: 11 }, (_, i) => current - i);
    })();

    const handleChange = (year: string) => {
        formHandler.setData('year', year);
        router.get(
            dashboard().url,
            { year },
            { preserveState: true, replace: true }, // no full reload
        );
    };

    return (
        <div>
            <FormField>
                <FormItem>
                    <Select name="year" value={String(formHandler.data.year)} onValueChange={handleChange}>
                        <SelectTrigger id="year" aria-invalid={formHandler.errors.year ? true : false} className="flex items-center font-medium">
                            <Calendar className="mr-1.5 size-4" />
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
        </div>
    );
};

export default FilterYear;
