import { Ellipsis } from 'lucide-react';
import React from 'react';
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

type DropdownItem = {
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

const ActionDropdownMenu: React.FC<DropdownMenuProps> = ({ items, row }) => {
    const renderMenuItems = (items: DropdownItem[]) => {
        return items.map((item, index) => {
            if (item.isSeparator) {
                return <DropdownMenuSeparator key={index} />;
            }

            const isDisabled = typeof item.disabled === 'function' ? item.disabled(row) : item.disabled;

            return (
                <DropdownMenuItem key={index} onClick={() => !isDisabled && item.handler?.(row)} disabled={isDisabled}>
                    {item.label}
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
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>{renderMenuItems(items)}</DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ActionDropdownMenu;
