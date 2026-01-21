import { cn } from '@/lib/utils';
import React, { JSX } from 'react';

export default function GlassyCard({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element {
    return (
        <div className={cn('rounded-xl border border-weak bg-glassy p-1.5 shadow-inner backdrop-blur-[5px] transition-all duration-300', className)}>
            {children}
        </div>
    );
}
