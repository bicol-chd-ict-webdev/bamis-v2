import { cn } from '@/lib/utils';
import type { Expenditure, LineItem, ObjectDistribution, Obligation, OfficeAllotment, Section } from '@/types';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Check, ChevronsUpDown } from 'lucide-react';
import { JSX, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem } from './ui/command';
import { Popover, PopoverContent } from './ui/popover';

type ComboboxData = LineItem[] | Expenditure[] | ObjectDistribution[] | Section[] | OfficeAllotment[] | Obligation[] | { id: number; name: string }[];

interface ComboboxProps {
    id: string;
    placeholder: string;
    hasError?: string;
    selectedValue: number;
    onSelect: (selectedData: number) => void;
    data: ComboboxData;
    onBlur?: () => void;
}

const Combobox = ({ id, placeholder, hasError, selectedValue, onSelect, data, onBlur }: ComboboxProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
    const parentRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const itemHeight = 35;
    const maxVisibleItems = 5;

    const getLabel = (item: ComboboxData[number]): string => {
        return (item as any).name
            ? (item as any).name
            : (item as any).section_acronym
              ? (item as any).section_acronym
              : (item as any).oras_number_reference
                ? (item as any).expenditure_name
                : (item as any).expenditure_name;
    };

    const filteredData = useMemo(() => {
        const lower: string = searchTerm.toLowerCase();
        return data.filter((item): boolean => getLabel(item).toLowerCase().includes(lower));
    }, [data, searchTerm]);

    const containerHeight: number = Math.min(filteredData.length, maxVisibleItems) * itemHeight;

    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
        count: filteredData.length,
        getScrollElement: (): HTMLDivElement | null => parentRef.current,
        estimateSize: (): number => itemHeight,
        overscan: 5,
    });

    const handleSelect = (currentValue: number): void => {
        onSelect(currentValue);
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            const raf: number = requestAnimationFrame((): void => {
                rowVirtualizer.measure();
                setHighlightedIndex(0);
            });
            return (): void => cancelAnimationFrame(raf);
        }
    }, [open, filteredData.length, rowVirtualizer]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild id={id}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'justify-between bg-transparent font-normal focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                        hasError && 'border-destructive ring-destructive/20 dark:ring-destructive/40',
                    )}
                    onBlur={onBlur}
                >
                    <p className="max-w-sm truncate">
                        {Number(selectedValue)
                            ? ((): string => {
                                  const selected = data.find((item): boolean => item.id === Number(selectedValue));
                                  return selected ? getLabel(selected) : placeholder;
                              })()
                            : placeholder}
                    </p>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('max-w-full p-0', 'w-full min-w-(--radix-popper-anchor-width)')}>
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        value={searchTerm}
                        onValueChange={(val: string): void => {
                            setSearchTerm(val);
                            setHighlightedIndex(0);
                        }}
                        onKeyDown={(e): void => {
                            if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                setHighlightedIndex((prev: number): number => {
                                    const next: number = Math.min(prev + 1, filteredData.length - 1);
                                    rowVirtualizer.scrollToIndex(next);
                                    return next;
                                });
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                setHighlightedIndex((prev: number): number => {
                                    const next: number = Math.max(prev - 1, 0);
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

                    <div ref={parentRef} style={{ height: containerHeight, overflowY: 'auto' }} onWheel={(e): void => e.stopPropagation()}>
                        <div
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                position: 'relative',
                                width: '100%',
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map((virtualRow): JSX.Element | null => {
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
                                            onSelect={(): void => handleSelect(item.id)}
                                            data-highlighted={highlightedIndex === virtualRow.index}
                                            className={cn(highlightedIndex === virtualRow.index && 'bg-muted')}
                                            onMouseEnter={(): void => setHighlightedIndex(virtualRow.index)}
                                        >
                                            <p className="max-w-2xl truncate" title={getLabel(item)}>
                                                {getLabel(item)}
                                            </p>
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
