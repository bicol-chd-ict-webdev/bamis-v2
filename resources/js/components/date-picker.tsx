import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

type DatePickerProps = {
    id: string;
    value?: Date | string;
    onChange?: (date: Date | undefined) => void;
};

function formatDate(date: Date | undefined) {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

function parseDate(value: Date | string | undefined): Date | undefined {
    if (!value) return undefined;
    if (value instanceof Date) return isNaN(value.getTime()) ? undefined : value;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? undefined : parsed;
}

export function DatePicker({ id, value, onChange }: DatePickerProps) {
    const parsedValue = parseDate(value);
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(parsedValue);
    const [open, setOpen] = React.useState(false);
    const [month, setMonth] = React.useState<Date | undefined>(parsedValue);
    const [inputValue, setInputValue] = React.useState<string>(formatDate(parsedValue));

    React.useEffect(() => {
        const newDate = parseDate(value);
        setInternalDate(newDate);
        setMonth(newDate);
        setInputValue(formatDate(newDate));
    }, [value]);

    const handleDateChange = (selectedDate: Date | undefined) => {
        setInternalDate(selectedDate);
        setInputValue(formatDate(selectedDate));
        setMonth(selectedDate);
        onChange?.(selectedDate);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <Input
                    id={id}
                    value={inputValue}
                    placeholder="June 01, 2025"
                    className="bg-background pr-10"
                    onChange={(e) => {
                        const userInput = e.target.value;
                        setInputValue(userInput);
                        const parsed = parseDate(userInput);
                        if (parsed) {
                            handleDateChange(parsed);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setOpen(true);
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button id={id} variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                        <Calendar
                            mode="single"
                            selected={internalDate}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                handleDateChange(date);
                                setOpen(false);
                            }}
                            disabled={(date) => date > new Date()}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
