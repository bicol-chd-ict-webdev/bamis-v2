import { Column } from '@tanstack/react-table';
import { MoveDown, MoveUp } from 'lucide-react';
import { Button } from './ui/button';

interface SortableHeaderProps {
    column: Column<any>;
    label: string;
}

const SortableHeader = ({ column, label }: SortableHeaderProps) => {
    return (
        <Button className="w-full !justify-between px-2" variant="ghost" onClick={column.getToggleSortingHandler()}>
            {label}
            <div className="flex -space-x-2">
                <MoveUp className={`size-3.5 ${column.getIsSorted() === 'asc' ? 'text-current' : 'text-border'}`} strokeWidth={2.5} />
                <MoveDown className={`size-3.5 ${column.getIsSorted() === 'desc' ? 'text-current' : 'text-border'}`} strokeWidth={2.5} />
            </div>
        </Button>
    );
};

export default SortableHeader;
