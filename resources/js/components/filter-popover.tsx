import { Filter } from 'lucide-react';
import { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

interface FilterPopoverProps<T> {
    data: T[];
    onFilterChange: (selectedIds: number[]) => void;
    placeholder: string;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
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
}: FilterPopoverProps<T>) {
    const handleCommandItemClick = (id: number) => {
        setSelectedIds((prev) => {
            const isSelected = prev.includes(id);
            return isSelected ? prev.filter((itemId) => itemId !== id) : [...prev, id];
        });
    };

    useEffect(() => {
        onFilterChange(selectedIds);
    }, [selectedIds, onFilterChange]);

    const handleClearFilters = () => {
        setSelectedIds([]);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="border-dashed">
                    <Filter className="size-4" />
                    {placeholder}
                    {selectedIds.length > 0 && (
                        <>
                            <Separator orientation="vertical" />
                            <div className="flex space-x-2">
                                {selectedIds.length < 3 ? (
                                    selectedIds.map((id) => {
                                        const item = data.find((item) => item[keyField] === (id as any));
                                        return item ? (
                                            <Badge key={id} variant="secondary">
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
                            {data.map((item) => {
                                const itemId = item[keyField] as unknown as number;
                                const itemLabel = item[labelField];
                                const itemCount = countField ? item[countField] : undefined;

                                return (
                                    <CommandItem
                                        key={String(itemId)}
                                        value={String(itemLabel)}
                                        className="justify-between"
                                        onSelect={() => handleCommandItemClick(itemId)}
                                    >
                                        <Checkbox checked={selectedIds.includes(itemId)} onCheckedChange={() => handleCommandItemClick(itemId)} />
                                        <span>{String(itemLabel)}</span>
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
