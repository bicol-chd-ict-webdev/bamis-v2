import { Badge, badgeVariants } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

const statusVariant: Record<string, BadgeVariant> = {
    active: 'default',
    inactive: 'secondary',
};

export default function AccountStatusBadge({ status }: { status: string }) {
    const variant = statusVariant[status] ?? 'outline';

    return (
        <Badge variant={variant} className="capitalize">
            {status}
        </Badge>
    );
}
