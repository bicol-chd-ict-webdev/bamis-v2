import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FormFieldProps {
    children: ReactNode;
    className?: string;
}

export default function FormField({ children, className }: FormFieldProps) {
    return <div className={cn('mt-4 grid gap-6', className)}>{children}</div>;
}
