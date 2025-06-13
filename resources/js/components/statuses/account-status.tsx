import { cn } from '@/lib/utils';

const statusClasses: { [key: string]: string } = {
    Inactive: 'bg-destructive',
    Active: 'bg-primary',
};

export default function AccountStatus({ status }: { status: string }) {
    const bgColor = statusClasses[status] || 'bg-secondary';

    return (
        <p className="inline-flex w-fit shrink-0 items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap">
            <span className={cn('mr-2 size-2.5 rounded-sm', bgColor)}></span>
            {status}
        </p>
    );
}
