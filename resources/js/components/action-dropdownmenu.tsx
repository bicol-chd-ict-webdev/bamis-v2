import { cn } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';
import React, { JSX } from 'react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export type DropdownItem = {
    icon?: React.ReactNode;
    label?: string;
    action?: string;
    handler?: (row: any) => void;
    isSeparator?: boolean;
    disabled?: boolean | ((row: any) => boolean);
};

interface DropdownMenuProps {
    items: DropdownItem[];
    row?: any;
}

const ActionDropdownMenu: React.FC<DropdownMenuProps> = ({ items, row }: DropdownMenuProps): JSX.Element => {
    const renderMenuItems = (items: DropdownItem[]): JSX.Element[] => {
        return items.map((item: DropdownItem, index: number): JSX.Element => {
            if (item.isSeparator) {
                return <DropdownMenuSeparator key={index} />;
            }

            const isDisabled: boolean | undefined = typeof item.disabled === 'function' ? item.disabled(row) : item.disabled;
            const isDelete: boolean = item.label?.toLowerCase() === 'delete';
            const iconClasses: string = cn(isDelete ? 'text-destructive' : 'text-muted-foreground');

            const iconElement =
                item.icon && React.isValidElement(item.icon)
                    ? React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                          className: cn((item.icon.props as any)?.className, iconClasses),
                      })
                    : item.icon && <span className={iconClasses}>{item.icon}</span>;

            return (
                <DropdownMenuItem
                    key={index}
                    onClick={(): false | void | undefined => !isDisabled && item.handler?.(row)}
                    disabled={isDisabled}
                    variant={item.label === 'Delete' ? 'destructive' : 'default'}
                >
                    {iconElement}
                    <span className={item.label === 'Delete' ? 'text-destructive' : ''}>{item.label}</span>
                </DropdownMenuItem>
            );
        });
    };

    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 min-w-full">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>{renderMenuItems(items)}</DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ActionDropdownMenu;
