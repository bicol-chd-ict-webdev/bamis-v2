import { cn } from '@/lib/utils';
import { type Expenditure, type LineItem, type ObjectDistribution, type Obligation, type OfficeAllotment, type Section } from '@/types';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem } from './ui/command';
import { Popover, PopoverContent } from './ui/popover';

type ComboboxData = Expenditure[] | LineItem[] | OfficeAllotment[] | ObjectDistribution[] | Section[] | Obligation[];

interface ComboboxProps {
    id: string;
    placeholder: string;
    hasError?: string;
    selectedValue: number;
    onSelect: (selectedSection: number) => void;
    data: ComboboxData;
}

const Combobox = ({ id, placeholder, hasError, selectedValue, onSelect, data }: ComboboxProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
    const parentRef = useRef<HTMLDivElement>(null);
    const itemHeight = 35;
    const maxVisibleItems = 5;

    const getLabel = (item: ComboboxData[number]): string => {
        return (item as any).name ?? (item as any).expenditure_name ?? (item as any).section_acronym ?? (item as any).oras_number_reference ?? '';
    };

    const filteredData = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return data.filter((item) => getLabel(item).toLowerCase().includes(lower));
    }, [data, searchTerm]);

    const containerHeight = Math.min(filteredData.length, maxVisibleItems) * itemHeight;

    const rowVirtualizer = useVirtualizer({
        count: filteredData.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => itemHeight,
        overscan: 5,
    });

    const handleSelect = (currentValue: number) => {
        onSelect(currentValue);
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            rowVirtualizer.measure();
            setHighlightedIndex(0);
        }
    }, [open, filteredData.length]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild id={id}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'focus-visible:ring-ring justify-between font-normal',
                        hasError && 'ring-destructive/10 dark:ring-destructive/40 border-destructive bg-destructive/10 hover:bg-destructive/10',
                    )}
                >
                    <p className="max-w-sm truncate">
                        {Number(selectedValue)
                            ? (() => {
                                  const selected = data.find((item) => item.id === Number(selectedValue));
                                  return selected ? getLabel(selected) : placeholder;
                              })()
                            : placeholder}
                    </p>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('max-w-full p-0', 'w-full min-w-[var(--radix-popper-anchor-width)]')}>
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        value={searchTerm}
                        onValueChange={(val) => {
                            setSearchTerm(val);
                            setHighlightedIndex(0);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                setHighlightedIndex((prev) => {
                                    const next = Math.min(prev + 1, filteredData.length - 1);
                                    rowVirtualizer.scrollToIndex(next);
                                    return next;
                                });
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                setHighlightedIndex((prev) => {
                                    const next = Math.max(prev - 1, 0);
                                    rowVirtualizer.scrollToIndex(next);
                                    return next;
                                });
                            } else if (e.key === 'Enter') {
                                e.preventDefault();
                                if (highlightedIndex >= 0 && highlightedIndex < filteredData.length) {
                                    handleSelect(filteredData[highlightedIndex].id);
                                }
                            }
                        }}
                    />
                    <CommandEmpty>No results found.</CommandEmpty>

                    <div ref={parentRef} style={{ height: containerHeight, overflowY: 'auto' }}>
                        <div
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                position: 'relative',
                                width: '100%',
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                const item = filteredData[virtualRow.index];
                                if (!item) return null;

                                return (
                                    <div
                                        key={item.id}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        <CommandItem
                                            value={getLabel(item)}
                                            onSelect={() => handleSelect(item.id)}
                                            data-highlighted={highlightedIndex === virtualRow.index}
                                            className={cn(highlightedIndex === virtualRow.index && 'bg-muted')}
                                            onMouseEnter={() => setHighlightedIndex(virtualRow.index)}
                                        >
                                            <p className="max-w-2xl truncate">{getLabel(item)}</p>
                                            <Check className={cn('ml-auto', selectedValue === item.id ? 'opacity-100' : 'opacity-0')} />
                                        </CommandItem>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Combobox;
