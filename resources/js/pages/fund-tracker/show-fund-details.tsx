import GlassyCard from '@/components/glassy-card';
import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormatMoney } from '@/lib/formatter';
import { OfficeAllotment, Section } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, Banknote, Building2, ChevronRight, Clock3, Landmark, Search as SearchIcon, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import { JSX } from 'react';

interface ShowFundDetailsProps {
    section: Section;
    officeAllotments: OfficeAllotment[];
    metrics: [];
}
const ShowFundDetails = ({ section, officeAllotments, metrics }: ShowFundDetailsProps): JSX.Element => {
    console.log(officeAllotments);
    return (
        <>
            <Head title="Fund Intelligence" />

            <main className="flex min-h-svh flex-col gap-6">
                <div className="grid grid-cols-3 gap-6 divide-x divide-border">
                    <div className="flex h-screen flex-col divide-y divide-border">
                        {/* Fixed at the top */}
                        <div className="sticky top-0 z-10 flex flex-col divide-y divide-border bg-background">
                            <div className="flex items-center gap-4 p-4">
                                <ItemMedia variant="icon">
                                    <Building2 />
                                </ItemMedia>

                                <div className="flex min-w-0 flex-col">
                                    <p className="truncate text-lg leading-snug font-bold" title={section.name}>
                                        {section.name}
                                    </p>
                                    <ItemDescription className="text-xs">Budget Code: {section.code}</ItemDescription>
                                </div>
                            </div>

                            <div className="p-4">
                                <InputGroup>
                                    <InputGroupInput name="search" autoComplete="off" placeholder="Filter..." />
                                    <InputGroupAddon>
                                        <SearchIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </div>

                        {/* Scrollable content */}
                        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
                            {officeAllotments.map(
                                (officeAllotment: OfficeAllotment): JSX.Element => (
                                    <Item key={officeAllotment.id} className="cursor-pointer gap-0 bg-card" variant="outline">
                                        <ItemHeader>
                                            <ItemTitle>{(officeAllotment as any).line_item_name}</ItemTitle>
                                            <ItemTitle>{FormatMoney(Number(officeAllotment.amount))}</ItemTitle>
                                        </ItemHeader>
                                        <ItemContent>
                                            <ItemDescription className="mb-1 text-xs">WFP Code</ItemDescription>
                                            <Progress className="h-1" />
                                        </ItemContent>
                                    </Item>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="col-span-2 min-h-screen gap-6 pr-4">
                        <ItemContent className="py-4">
                            <div className="flex items-center justify-center gap-1 self-start rounded-full border px-3 py-0.5 text-xs font-semibold text-primary">
                                <Activity className="size-3" />
                                <span>Targeted Allotment</span>
                            </div>
                            <ItemTitle className="text-2xl font-bold tracking-tight">Unit Consolidated Oversight</ItemTitle>
                        </ItemContent>

                        <div className="flex flex-col gap-6">
                            <GlassyCard className="grid grid-cols-4 items-start gap-2">
                                <Item className="group flex-col items-start bg-card" variant="outline">
                                    <div className="flex w-full items-center justify-between">
                                        <ItemMedia variant="icon" className="border">
                                            <Landmark />
                                        </ItemMedia>
                                    </div>
                                    <ItemContent>
                                        <ItemDescription>Allotment</ItemDescription>
                                        <h1 className="text-xl font-bold">{FormatMoney(metrics.allocation.amount)}</h1>
                                        <p className="text-xs text-muted-foreground">Fund Ceiling</p>
                                    </ItemContent>
                                </Item>

                                <Item className="group flex-col items-start bg-card" variant="outline">
                                    <div className="flex w-full items-center justify-between">
                                        <ItemMedia variant="icon" className="border">
                                            <ShieldCheck />
                                        </ItemMedia>
                                        <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2.5 py-0.5">
                                            <TrendingUp className="h-3 w-3 text-primary" />
                                            <span className="text-xs font-bold text-primary">{metrics.obligation.rate}%</span>
                                        </div>
                                    </div>
                                    <ItemContent>
                                        <ItemDescription>Obligations</ItemDescription>
                                        <h1 className="text-xl font-bold">{FormatMoney(metrics.obligation.amount)}</h1>
                                        <p className="text-xs text-muted-foreground">Commited Funds</p>
                                    </ItemContent>
                                </Item>

                                <Item className="group flex-col items-start bg-card" variant="outline">
                                    <div className="flex w-full items-center justify-between">
                                        <ItemMedia variant="icon" className="border">
                                            <Banknote />
                                        </ItemMedia>
                                        <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2.5 py-0.5">
                                            <TrendingUp className="h-3 w-3 text-primary" />
                                            <span className="text-xs font-bold text-primary">{metrics.disbursement.rate}%</span>
                                        </div>
                                    </div>
                                    <ItemContent>
                                        <ItemDescription>Disbursements</ItemDescription>
                                        <h1 className="text-xl font-bold">{FormatMoney(metrics.disbursement.amount)}</h1>
                                        <p className="text-xs text-muted-foreground">Actual Utilization</p>
                                    </ItemContent>
                                </Item>

                                <Item className="group flex-col items-start bg-card" variant="outline">
                                    <div className="flex w-full items-center justify-between">
                                        <ItemMedia variant="icon" className="border">
                                            <Wallet />
                                        </ItemMedia>
                                    </div>
                                    <ItemContent>
                                        <ItemDescription>Balance</ItemDescription>
                                        <h1 className="text-xl font-bold">{FormatMoney(metrics.balance)}</h1>
                                        <p className="text-xs text-muted-foreground">Available Limit</p>
                                    </ItemContent>
                                </Item>
                            </GlassyCard>

                            <div className="flex flex-col gap-4">
                                <ItemHeader className="flex flex-row items-center gap-4">
                                    <div className="flex flex-1 flex-col">
                                        <CardTitle>Commitment Ledger</CardTitle>
                                        <CardDescription>asdasdasd</CardDescription>
                                    </div>

                                    <RadioGroup>
                                        <div className="flex rounded-md border border-muted bg-muted/75 p-1">
                                            <FieldLabel
                                                htmlFor="all"
                                                className="items-center rounded-sm px-3 py-1 text-muted-foreground has-data-[state=checked]:bg-card has-data-[state=checked]:text-primary has-data-[state=checked]:shadow"
                                            >
                                                <span>All</span>
                                                <Badge variant="default">3</Badge>
                                                <RadioGroupItem value="all" id="all" className="hidden" />
                                            </FieldLabel>

                                            <FieldLabel
                                                htmlFor="active"
                                                className="items-center rounded-sm px-3 py-1 text-muted-foreground has-data-[state=checked]:bg-card has-data-[state=checked]:text-primary has-data-[state=checked]:shadow"
                                            >
                                                <span className="has-data-[state=checked]:text-primary">Active</span>
                                                <Badge variant="outline">3</Badge>
                                                <RadioGroupItem value="active" id="active" className="hidden" />
                                            </FieldLabel>

                                            <FieldLabel
                                                htmlFor="settled"
                                                className="items-center rounded-sm px-3 py-1 text-muted-foreground has-data-[state=checked]:bg-card has-data-[state=checked]:text-primary has-data-[state=checked]:shadow"
                                            >
                                                <span className="has-data-[state=checked]:text-primary">Settled</span>
                                                <Badge variant="outline">3</Badge>
                                                <RadioGroupItem value="settled" id="settled" className="hidden" />
                                            </FieldLabel>
                                        </div>
                                    </RadioGroup>
                                </ItemHeader>

                                <ItemContent className="group grid cursor-pointer gap-2">
                                    <Item variant="outline" className="items-start">
                                        <Item className="mr-2 flex-1 gap-0 p-0">
                                            <ItemHeader className="mb-2 justify-start">
                                                <div className="flex items-center justify-center gap-1 rounded-full border px-3 py-0.5 text-xs font-semibold text-blue-600">
                                                    <Clock3 className="size-3" />
                                                    <span>Active</span>
                                                </div>
                                                <span className="text-xs font-medium text-muted-foreground">HIT-1598-02-101101-2025-05-0001</span>
                                            </ItemHeader>
                                            <ItemContent>
                                                <ItemTitle className="text-base font-semibold group-hover:text-primary">
                                                    Unified Health Suppliers
                                                </ItemTitle>
                                                <ItemDescription>
                                                    FABRICATION, REPAIR, REPAINTING, AND RENOVATION WORKS OF VARIOUS HEALTH FACILITIES B.4.5
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>

                                        <div className="flex shrink-0 items-center gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-base font-semibold">{FormatMoney(1500000)}</div>
                                                <div className="flex items-center justify-end gap-2 text-xs">
                                                    <p className="font-medium text-muted-foreground">Settled</p>
                                                    <p className="font-semibold text-primary">{FormatMoney(0)}</p>
                                                </div>
                                                <Progress className="h-1" />
                                                <p className="self-end text-xs font-medium text-primary">
                                                    <span className="font-semibold">100%</span> Liquidation
                                                </p>
                                            </div>
                                            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                                        </div>
                                    </Item>
                                </ItemContent>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ShowFundDetails;
