import { DatePicker } from '@/components/date-picker';
import FormField from '@/components/form-field';
import FormItem from '@/components/form-item';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { FormDefaults } from '@/contexts/modal-context';
import { InertiaFormProps } from '@inertiajs/react';

type ExportReportBaseFormProps = {
    formHandler: InertiaFormProps<FormDefaults>;
};

const ExportReportBaseForm = ({ formHandler }: ExportReportBaseFormProps) => {
    return (
        <FormField>
            <FormItem>
                <RadioGroup
                    name="type"
                    value={String(formHandler.data.type)}
                    onValueChange={(value) => formHandler.setData('type', value)}
                    className="border-input flex gap-0 rounded-md border"
                >
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
                    <Separator orientation="vertical" />
                    <div className="flex w-full items-center gap-3 px-3">
                        <RadioGroupItem value="accounts-payable" id="accounts-payable" />
                        <Label htmlFor="accounts-payable" className="flex-1 py-3">
                            ACCOUNTS
                        </Label>
                    </div>
                </RadioGroup>
            </FormItem>

            <FormField className="mt-0">
                <FormItem>
                    <Label htmlFor="date">Date</Label>
                    <DatePicker
                        id="date"
                        value={String(formHandler.data.date)}
                        onChange={(date) => {
                            if (date) {
                                const formatted = date.toLocaleDateString('en-CA');
                                formHandler.setData('date', formatted);
                            }
                        }}
                    />
                </FormItem>
            </FormField>
        </FormField>
    );
};

export default ExportReportBaseForm;
