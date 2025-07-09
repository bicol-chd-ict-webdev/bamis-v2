import { cn } from '@/lib/utils';
import CurrencyInput from 'react-currency-input-field';

type MoneyInputProps = {
    id: string;
    name: string;
    value: string;
    invalid: boolean;
    allowNegativeValue?: boolean;
    onValueChange: (value: string) => void;
};

export const MoneyInput: React.FC<MoneyInputProps> = ({ id, name, value, invalid, onValueChange, allowNegativeValue = false }) => {
    return (
        <CurrencyInput
            id={id}
            name={name}
            autoComplete="off"
            className={cn(
                'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'hover:shadow-xs',
                'focus-visible:border-primary focus-visible:ring-primary/10 focus-visible:bg-primary/10 focus-visible:ring-[3px]',
                invalid ? 'ring-destructive/10 dark:ring-destructive/40 border-destructive bg-destructive/10' : '',
            )}
            intlConfig={{ locale: 'en-PH', currency: 'PHP' }}
            decimalsLimit={2}
            allowNegativeValue={allowNegativeValue}
            placeholder="0.00"
            value={value}
            onValueChange={(val) => onValueChange(val ?? '')}
        />
    );
};
