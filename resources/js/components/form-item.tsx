import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FormItemProps {
    children: ReactNode;
    className?: string;
}

export default function FormItem({ children, className }: FormItemProps) {
    return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
}
