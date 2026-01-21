import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group';
import { InputGroup } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { useModalContext } from '@/contexts/modal-context';
import { cn } from '@/lib/utils';
import React, { JSX } from 'react';
import CurrencyInput from 'react-currency-input-field';

type MoneyInputProps = {
    id: string;
    name: string;
    value: string;
    invalid: boolean;
    allowNegativeValue?: boolean;
    disabled?: boolean;
    onValueChange: (value: string) => void;
};

export const MoneyInput: React.FC<MoneyInputProps> = ({
    id,
    name,
    value,
    invalid,
    onValueChange,
    allowNegativeValue = false,
    disabled = false,
}: MoneyInputProps): JSX.Element => {
    const { formHandler } = useModalContext();

    const handleBlur = (): void => {
        formHandler.validate(name);
    };

    return (
        <ButtonGroup>
            <ButtonGroupText asChild>
                <Label htmlFor={id}>Php</Label>
            </ButtonGroupText>
            <InputGroup>
                <CurrencyInput
                    id={id}
                    name={name}
                    autoComplete="off"
                    className={cn(
                        'flex h-9 w-full min-w-0 rounded-r-md border border-transparent bg-transparent px-3 py-1 text-base outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground md:text-sm',
                        'hover:shadow-xs',
                        'focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-[3px] focus-visible:ring-primary/10',
                        invalid && 'border-destructive bg-destructive/10 ring-destructive/10 dark:ring-destructive/40',
                        disabled && 'cursor-not-allowed opacity-50',
                    )}
                    intlConfig={{ locale: 'en-PH' }}
                    decimalsLimit={2}
                    allowNegativeValue={allowNegativeValue}
                    placeholder="0.00"
                    value={value}
                    onValueChange={(val: string | undefined): void => onValueChange(val ?? '')}
                    onBlur={handleBlur}
                    disabled={disabled}
                />
            </InputGroup>
        </ButtonGroup>
    );
};
