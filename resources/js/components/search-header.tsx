import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search as SearchIcon } from 'lucide-react';
import { ChangeEvent, JSX, ReactNode } from 'react';

interface SearchHeaderProps {
    search: string;
    onSearchChange: (value: string) => void;
    showAction?: boolean;
    actionLabel?: string;
    actionIcon?: ReactNode;
    onActionClick?: () => void;
    children?: ReactNode;
    childrenPosition?: 'beside-search' | 'beside-button';
}

export default function SearchHeader({
    search,
    onSearchChange,
    showAction = false,
    actionLabel = '',
    actionIcon,
    onActionClick,
    children,
    childrenPosition = 'beside-button',
}: SearchHeaderProps): JSX.Element {
    return (
        <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
                <InputGroup className="max-w-72">
                    <InputGroupInput
                        name="search"
                        autoComplete="off"
                        placeholder="Search..."
                        value={search}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value)}
                    />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>

                {childrenPosition === 'beside-search' && children}
            </div>

            <div className="flex items-center space-x-4">
                {childrenPosition === 'beside-button' && children}

                {showAction && (
                    <Button onClick={onActionClick}>
                        {actionIcon}
                        <span>{actionLabel}</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
