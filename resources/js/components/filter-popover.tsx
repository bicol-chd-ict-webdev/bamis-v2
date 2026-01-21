import { CircleX, Filter } from 'lucide-react';
import React, { JSX, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

interface FilterPopoverProps<T> {
    data: T[];
    onFilterChange: (selectedIds: (number | string)[]) => void;
    placeholder: string;
    selectedIds: (number | string)[];
    setSelectedIds: React.Dispatch<React.SetStateAction<(number | string)[]>>;
    keyField: keyof T;
    labelField: keyof T;
    countField?: keyof T;
}

function FilterPopover<T>({
    data,
    onFilterChange,
    placeholder,
    selectedIds,
    setSelectedIds,
    keyField,
    labelField,
    countField,
}: FilterPopoverProps<T>): JSX.Element {
    const handleCommandItemClick = (id: number | string): void => {
        setSelectedIds((prev: (number | string)[]): (number | string)[] => {
            const isSelected: boolean = prev.includes(id);
            return isSelected ? prev.filter((itemId: number | string): boolean => itemId !== id) : [...prev, id];
        });
    };

    useEffect((): void => {
        onFilterChange(selectedIds);
    }, [selectedIds, onFilterChange]);

    const handleClearFilters = (): void => {
        setSelectedIds([]);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="border-dashed">
                    {selectedIds.length > 0 ? (
                        <span
                            onClick={(e): void => {
                                e.stopPropagation();
                                handleClearFilters();
                            }}
                            role="button"
                            aria-label="Clear filter"
                            tabIndex={0}
                            onKeyDown={(e): void => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleClearFilters();
                                }
                            }}
                            className="opacity-70 transition-opacity hover:opacity-100"
                        >
                            <CircleX className="size-4" />
                        </span>
                    ) : (
                        <Filter className="size-4" />
                    )}
                    {placeholder}
                    {selectedIds.length > 0 && (
                        <>
                            <Separator orientation="vertical" />
                            <div className="flex space-x-2">
                                {selectedIds.length < 3 ? (
                                    selectedIds.map((id: number | string): JSX.Element | null => {
                                        const item: T | undefined = data.find((item: T): boolean => item[keyField] === (id as any));
                                        return item ? (
                                            <Badge key={id} variant="secondary" className="capitalize">
                                                {String(item[labelField])}
                                            </Badge>
                                        ) : null;
                                    })
                                ) : (
                                    <Badge variant="secondary">{selectedIds.length} selected</Badge>
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((item: T): JSX.Element => {
                                const itemId = item[keyField] as unknown as number | string;
                                const itemLabel: T[keyof T] = item[labelField];
                                const itemCount: T[keyof T] | undefined = countField ? item[countField] : undefined;

                                return (
                                    <CommandItem
                                        key={String(itemId)}
                                        value={String(itemLabel)}
                                        className="justify-between capitalize"
                                        onSelect={(): void => handleCommandItemClick(itemId)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={selectedIds.includes(itemId)}
                                                onCheckedChange={(): void => handleCommandItemClick(itemId)}
                                                className="[&[data-state=checked]_svg]:!text-primary-foreground"
                                            />
                                            <span>{String(itemLabel)}</span>
                                        </div>
                                        {itemCount !== undefined && <span className="ml-auto">{String(itemCount)}</span>}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                    {selectedIds.length > 0 && (
                        <CommandList className="border-t p-1">
                            <CommandItem className="flex items-center justify-center" onSelect={handleClearFilters}>
                                Clear Filters
                            </CommandItem>
                        </CommandList>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default FilterPopover;
