import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from '@/components/ui/item';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormatMoney } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import { show } from '@/routes/fundtracker';
import { Division, Section } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Banknote, Filter, Landmark, RefreshCw, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import { JSX, useState } from 'react';

interface FundTrackerIndexProps {
    metrics: [];
    divisions: Division[];
    sections: Section[];
}

export default function FundTrackerIndex({ metrics, divisions, sections }: FundTrackerIndexProps): JSX.Element {
    const [selectedDivision, setSelectedDivision] = useState<string>('');
    const [selectedSection, setSelectedSection] = useState<string>('');

    console.log(metrics);

    // Filter sections based on selected division
    const filteredSections: Section[] = selectedDivision
        ? sections.filter((section: Section): boolean => String(section.division_id) === selectedDivision)
        : sections;

    const handleClearFilter = (): void => {
        setSelectedDivision('');
        setSelectedSection('');
    };

    const handleDivisionChange = (value: string): void => {
        setSelectedDivision(value);
        setSelectedSection('');
    };

    const handleSectionChange = (value: string): void => {
        setSelectedSection(value);
        router.visit(show.url(parseInt(value)));
    };

    return (
        <>
            <Head title="Fund Tracker" />

            <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-6 sm:p-8 md:p-10 lg:p-12">
                <section className="grid h-full place-items-center gap-6">
                    <div className="mx-auto flex max-w-xl flex-col gap-4 self-end text-center">
                        <div className="flex items-center justify-center gap-1 self-center rounded-full border px-3 py-0.5 text-xs font-semibold text-primary">
                            <ShieldCheck className="size-4" />
                            <span>Unified Financial Control</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tighter">
                            Agency <span className="text-primary italic">Financial</span> Oversight
                        </h1>
                        <p className="text-base font-medium text-muted-foreground">
                            A comprehensive aggregated intelligence view of system-wide fund utilization, commitment thresholds, and liquidation
                            velocity.
                        </p>
                    </div>

                    <div className="flex flex-1 flex-col items-start justify-center gap-6 self-start">
                        <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <Item variant="outline">
                                <ItemHeader>
                                    <ItemMedia variant="image" className="border">
                                        <Landmark className="text-muted-foreground" />
                                    </ItemMedia>
                                </ItemHeader>
                                <ItemContent>
                                    <ItemDescription>Agency Total Ceiling</ItemDescription>
                                    <ItemTitle className="text-2xl font-bold">{FormatMoney(metrics.allocation.amount)}</ItemTitle>
                                    <div
                                        className={cn(
                                            'mt-2 flex items-center gap-2 py-0.5 text-xs font-medium',
                                            metrics.allocation.rate < 0 ? 'text-destructive' : 'text-primary',
                                        )}
                                    >
                                        <TrendingUp
                                            className={cn('size-5', metrics.allocation.rate < 0 ? 'rotate-180 text-destructive' : 'text-primary')}
                                        />
                                        <span>{metrics.allocation.rate}%</span>
                                    </div>
                                </ItemContent>
                            </Item>

                            <Item variant="outline">
                                <ItemHeader>
                                    <ItemMedia variant="image" className="border">
                                        <ShieldCheck className="text-blue-600" />
                                    </ItemMedia>
                                </ItemHeader>
                                <ItemContent>
                                    <ItemDescription>Certified Commitments</ItemDescription>
                                    <ItemTitle className="text-2xl font-bold">{FormatMoney(metrics.obligation.amount)}</ItemTitle>
                                    <div className="mt-2 flex items-center gap-2 self-start rounded-full border-blue-200 bg-blue-100 px-3 py-0.5 font-medium text-blue-600">
                                        <TrendingUp className="size-5" />
                                        <span className="text-xs">{metrics.obligation.rate}% Utilization</span>
                                    </div>
                                </ItemContent>
                            </Item>

                            <Item variant="outline">
                                <ItemHeader>
                                    <ItemMedia variant="image" className="border">
                                        <Banknote className="text-primary" />
                                    </ItemMedia>
                                </ItemHeader>
                                <ItemContent>
                                    <ItemDescription>Gross Disbursements</ItemDescription>
                                    <ItemTitle className="text-2xl font-bold">{FormatMoney(metrics.disbursement.amount)}</ItemTitle>
                                    <div className="mt-2 flex items-center gap-2 self-start rounded-full border-green-200 bg-green-100 px-3 py-0.5 font-medium text-green-600">
                                        <TrendingUp className="size-4" />
                                        <span className="text-xs">{metrics.disbursement.rate}% Liquidation</span>
                                    </div>
                                </ItemContent>
                            </Item>

                            <Item variant="outline">
                                <ItemHeader>
                                    <ItemMedia variant="image" className="border">
                                        <Wallet className="text-orange-600" />
                                    </ItemMedia>
                                </ItemHeader>
                                <ItemContent>
                                    <ItemDescription>Uncommited Margin</ItemDescription>
                                    <ItemTitle className="text-2xl font-bold">{FormatMoney(metrics.balance)}</ItemTitle>
                                    <ItemDescription className="mt-2 py-0.5 text-xs">Available to obligate</ItemDescription>
                                </ItemContent>
                            </Item>
                        </div>

                        <Card className="w-full">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold tracking-tighter">Office Performance Portal</CardTitle>
                                <CardDescription>Navigate through operational hierarchies to audit specific unit fund flows.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="my-6">
                                    <Select value={selectedSection} onValueChange={handleSectionChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select office" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredSections.map(
                                                (section: Section): JSX.Element => (
                                                    <SelectItem key={section.id} value={String(section.id)}>
                                                        {section.name}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-1">
                                            <Filter className="size-4 text-muted-foreground" />
                                            <p className="text-sm font-semibold text-muted-foreground">Office Filter</p>
                                        </div>

                                        {selectedDivision && (
                                            <button
                                                onClick={handleClearFilter}
                                                className="flex cursor-pointer items-center gap-1 text-xs font-medium text-primary transition-opacity hover:opacity-75"
                                            >
                                                <RefreshCw className="size-3 text-primary" />
                                                Clear Filter
                                            </button>
                                        )}
                                    </div>
                                    <RadioGroup value={selectedDivision} onValueChange={handleDivisionChange}>
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                            {divisions.map(
                                                (division: Division): JSX.Element => (
                                                    <FieldLabel
                                                        key={division.id}
                                                        htmlFor={String(division.id)}
                                                        className="group flex w-full cursor-pointer flex-col rounded-md border p-3 text-center transition-all duration-200 hover:border-primary hover:bg-green-50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
                                                    >
                                                        <FieldContent className="gap-0">
                                                            <FieldTitle className="flex w-full justify-center font-semibold tracking-tight transition-all duration-200 group-hover:text-primary">
                                                                {division.acronym}
                                                            </FieldTitle>
                                                            <FieldDescription className="mt-1 text-xs font-medium text-muted-foreground">
                                                                {division.sections_count} units
                                                            </FieldDescription>
                                                        </FieldContent>
                                                        <RadioGroupItem value={String(division.id)} id={String(division.id)} className="hidden" />
                                                    </FieldLabel>
                                                ),
                                            )}
                                        </div>
                                    </RadioGroup>
                                </div>
                            </CardContent>
                            <CardFooter className="mx-6 border-t border-border/25">
                                <p className="mt-6 w-full text-center text-xs text-muted-foreground">
                                    Use the <span className="font-semibold text-primary">Office Filter</span> to rapidly filter the registry selector
                                    by agency division.
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
}
