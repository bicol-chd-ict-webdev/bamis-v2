'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { FormatMoney, FormatPercentage } from '@/lib/formatter';
import { Pie, PieChart } from 'recharts';

interface AllocationPieChartItem {
    allotmentClass: string;
    allocation: number;
}

interface AllocationPieChartProps {
    allocationPieChart: AllocationPieChartItem[];
}

export function AllocationPieChart({ allocationPieChart }: AllocationPieChartProps) {
    const chartData = [
        { allotmentClass: 'ps', allocation: Number(allocationPieChart[0].allocation), fill: 'var(--color-ps)' },
        { allotmentClass: 'mooe', allocation: Number(allocationPieChart[1].allocation), fill: 'var(--color-mooe)' },
        { allotmentClass: 'co', allocation: Number(allocationPieChart[2].allocation), fill: 'var(--color-co)' },
    ];

    const chartConfig = {
        ps: {
            label: 'PS',
            color: 'var(--chart-5)',
        },
        mooe: {
            label: 'MOOE',
            color: 'var(--chart-3)',
        },
        co: {
            label: 'CO',
            color: 'var(--chart-2)',
        },
    } satisfies ChartConfig;

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
                            label={({ percent }) => FormatPercentage(percent * 100)}
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
}
