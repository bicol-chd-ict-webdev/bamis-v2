import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

interface TableSkeletonProps {
    columns: number;
    index?: number;
}

export default function TableSkeleton({ columns, index }: TableSkeletonProps) {
    return (
        <TableRow key={index}>
            {Array.from({ length: columns }).map((_, i) => (
                <TableCell key={i}>
                    <Skeleton className="h-9 w-full" />
                </TableCell>
            ))}
        </TableRow>
    );
}
