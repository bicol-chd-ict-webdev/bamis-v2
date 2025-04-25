import { type Division } from '@/types';
import { Filter } from 'lucide-react';
import { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

type FilterPopoverData = Division[];

interface FilterPopoverProps {
    data: FilterPopoverData;
    onFilterChange: (selectedIds: number[]) => void;
    placeholder: string;
    keyField: string;
    labelField: string;
    countField?: string;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilterPopover = ({ data, onFilterChange, placeholder, keyField, labelField, countField, selectedIds, setSelectedIds }: FilterPopoverProps) => {
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
                                        const item = data.find((item) => item[keyField] === id);
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
                            {data.map((item) => (
                                <CommandItem
                                    key={String(item[keyField])}
                                    value={String(item[labelField])}
                                    className="justify-between"
                                    onSelect={() => handleCommandItemClick(item[keyField] as unknown as number)}
                                >
                                    <Checkbox
                                        checked={selectedIds.includes(item[keyField] as unknown as number)}
                                        onCheckedChange={() => handleCommandItemClick(item[keyField] as unknown as number)}
                                    />
                                    <span>{String(item[labelField])}</span>
                                    {countField && <span className="ml-auto">{item[countField]}</span>}
                                </CommandItem>
                            ))}
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
};

export default FilterPopover;
