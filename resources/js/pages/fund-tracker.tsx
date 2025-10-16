import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CapitalizeFirstLetter, FormatMoney, FormatPercentage } from '@/lib/formatter';
import { Head } from '@inertiajs/react';
import { Filter, Shapes } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart, XAxis, YAxis } from 'recharts';

interface FundTrackerProps {
    allotment: number;
    obligation: number;
    obligationRate: number;
    disbursement: number;
    disbursementRate: number;
    allocations: [];
    allocationPieChart: [];
    allocationBarChart: [];
}

export default function FundTracker({
    allotment,
    obligation,
    obligationRate,
    disbursement,
    disbursementRate,
    allocations,
    allocationPieChart,
    allocationBarChart,
}: FundTrackerProps) {
    return (
        <>
            <Head title="Fund Tracker" />

            <section className="mx-auto flex h-full w-full flex-col gap-4 rounded-xl">
                <div className="flex h-full flex-1 flex-col rounded-xl p-4">
                    <div className="flex items-start justify-between">
                        <Heading title="Dashboard" description="Quick budget overview" />
                        <Button variant="outline" size="sm">
                            <Filter />
                            Filter
                        </Button>
                    </div>

                    <div className="mb-4 grid grid-cols-3 gap-4">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                                <Shapes size={16} />
                                <h4>Allocation</h4>
                            </div>
                            <h1 className="text-3xl font-bold">{FormatMoney(allotment)}</h1>
                        </div>

                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                                <Shapes size={16} />
                                <h4>Obligation</h4>
                            </div>
                            <div className="flex items-center justify-between space-x-6">
                                <h1 className="text-3xl font-bold">{FormatMoney(obligation)}</h1>
                                <Badge>{FormatPercentage(obligationRate, 0)}</Badge>
                            </div>
                        </div>

                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative grid gap-4 rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                                <Shapes size={16} />
                                <h4>Disbursement</h4>
                            </div>
                            <div className="flex items-center justify-between space-x-6">
                                <h1 className="text-3xl font-bold">{FormatMoney(disbursement)}</h1>
                                <Badge>{FormatPercentage(disbursementRate, 0)}</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <AllocationBarChart allocationBarChart={allocationBarChart} />
                        <AllocationPieChart allocationPieChart={allocationPieChart} />
                    </div>

                    <Card className="py-0 shadow-none">
                        <Table className="table-auto">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="rounded-tl-lg">Line Item</TableHead>
                                    <TableHead className="text-right">Allotment</TableHead>
                                    <TableHead className="text-right">Obligation</TableHead>
                                    <TableHead className="text-right">Unobligated Balance</TableHead>
                                    <TableHead className="text-right">%ObUR</TableHead>
                                    <TableHead className="text-right">Disbursement</TableHead>
                                    <TableHead className="text-right">Unpaid Obligation</TableHead>
                                    <TableHead className="rounded-tr-lg text-right">%DisUR</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allocations.map((allocation) => (
                                    <TableRow key={allocation.line_item_id}>
                                        <TableCell className="max-w-[400px]">
                                            <p className="truncate" title={String(allocation.line_item)}>
                                                {allocation.line_item}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-right">{FormatMoney(allocation.allotment)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-right">{FormatMoney(allocation.obligation)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-right">{FormatMoney(allocation.unobligated_balance)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className={`text-right font-medium ${getRateColor(allocation.obligation_rate)}`}>
                                                {FormatPercentage(allocation.obligation_rate, 0)}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-right">{FormatMoney(allocation.disbursement)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-right">{FormatMoney(allocation.unpaid_obligation)}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className={`text-right font-medium ${getRateColor(allocation.disbursement_rate)}`}>
                                                {FormatPercentage(allocation.disbursement_rate, 0)}
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </section>
        </>
    );

    function getRateColor(rate: number) {
        if (rate <= 25) return 'text-destructive';
        if (rate <= 50) return 'text-orange-600';
        if (rate <= 75) return 'text-yellow-600';
        return 'text-primary';
    }
}

const AllocationPieChart = ({ allocationPieChart }: { allocationPieChart: [] }) => {
    const chartData = allocationPieChart.map((item) => ({
        allotmentClass: item.allotment_class.toLowerCase(),
        allocation: Number(item.amount),
        fill: `var(--color-${item.allotment_class.toLowerCase()})`,
    }));

    const chartConfig = allocationPieChart.reduce(
        (config, item, index) => {
            const key = item.allotment_class.toLowerCase();

            config[key] = {
                label: item.allotment_class,
                color: `var(--chart-${index + 1})`,
            };

            return config;
        },
        {} as Record<string, { label: string; color: string }>,
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Allocations</CardTitle>
                <CardDescription>Presents how the total budget is divided across allotment classes.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    formatter={(value, name) => {
                                        const config = chartConfig[name as keyof typeof chartConfig];
                                        const numericValue = Number(value);

                                        return (
                                            <div className="text-muted-foreground flex w-full items-center justify-between space-x-4 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-3 w-1 rounded-sm" style={{ backgroundColor: config?.color }} />
                                                    <p>{config?.label || name}</p>
                                                </div>
                                                <div className="text-foreground font-mono font-medium tabular-nums">{FormatMoney(numericValue)}</div>
                                            </div>
                                        );
                                    }}
                                />
                            }
                        />
                        <Pie
                            data={chartData}
                            dataKey="allocation"
                            nameKey="allotmentClass"
                            stroke="0"
                            label={({ percent }) => FormatPercentage(percent * 100, 0)}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="allotmentClass" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

const AllocationBarChart = ({ allocationBarChart }: { allocationBarChart: [] }) => {
    const chartData = allocationBarChart.map((row) => ({
        ...row,
        obligationRate: row.allocation ? (row.obligation / row.allocation) * 100 : 0,
        disbursementRate: row.obligation ? (row.disbursement / row.obligation) * 100 : 0,
    }));

    const maxValue = Math.max(...chartData.flatMap((d) => [d.allocation, d.obligation, d.disbursement]));

    const metricKeys = Array.from(new Set(allocationBarChart.flatMap(Object.keys)));
    const chartConfig = metricKeys.reduce(
        (config, key, index) => {
            config[key] = {
                label: key
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                color: `var(--chart-${index})`,
            };
            return config;
        },
        {} as Record<string, { label: string; color: string }>,
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Utilization</CardTitle>
                <CardDescription>Displays how much was budgeted, committed, and actually spent for each allotment class.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <ChartLegend verticalAlign="top" formatter={(value) => CapitalizeFirstLetter(value)} />
                        <CartesianGrid vertical={false} />
                        <YAxis
                            hide
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value: number) => FormatMoney(value)}
                            domain={[0, Math.ceil(maxValue * 1.1)]}
                        />
                        <XAxis dataKey="allotment_class" tickLine={false} tickMargin={10} axisLine={false} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    formatter={(value, name) => {
                                        const config = chartConfig[name as keyof typeof chartConfig];
                                        const numericValue = Number(value);

                                        return (
                                            <div className="text-muted-foreground flex w-full items-center justify-between space-x-4 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-3 w-1 rounded-sm" style={{ backgroundColor: config?.color }} />
                                                    <p>{config?.label || name}</p>
                                                </div>
                                                <div className="text-foreground font-mono font-medium tabular-nums">{FormatMoney(numericValue)}</div>
                                            </div>
                                        );
                                    }}
                                />
                            }
                        />
                        <Bar dataKey="allocation" fill="var(--color-allocation)" radius={4} />
                        <Bar dataKey="obligation" fill="var(--color-obligation)" radius={4}>
                            <LabelList
                                dataKey="obligationRate"
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: number) => FormatPercentage(value, 0)}
                            />
                        </Bar>
                        <Bar dataKey="disbursement" fill="var(--color-disbursement)" radius={4}>
                            <LabelList
                                dataKey="disbursementRate"
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: number) => FormatPercentage(value, 0)}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
