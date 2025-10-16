'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CapitalizeFirstLetter, FormatMoney, FormatPercentage } from '@/lib/formatter';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

const chartConfig = {
    allocation: {
        label: 'Allocation',
        color: 'var(--chart-1)',
    },
    obligation: {
        label: 'Obligation',
        color: 'var(--chart-2)',
    },
    disbursement: {
        label: 'Disbursement',
        color: 'var(--chart-3)',
    },
} satisfies ChartConfig;

interface BudgetUtilizationItem {
    allotmentClass: string;
    allocation: number;
    obligation: number;
    disbursement: number;
}

interface BudgetUtilizationProps {
    budgetUtilizations: BudgetUtilizationItem[];
}

export function BudgetUtilization({ budgetUtilizations }: BudgetUtilizationProps) {
    const chartData = budgetUtilizations.map((row) => ({
        ...row,
        obligationRate: row.allocation ? (row.obligation / row.allocation) * 100 : 0,
        disbursementRate: row.obligation ? (row.disbursement / row.obligation) * 100 : 0,
    }));

    const maxValue = Math.max(
        ...chartData.flatMap((d) => [d.allocation, d.obligation, d.disbursement])
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
                        <XAxis dataKey="allotmentClass" tickLine={false} tickMargin={10} axisLine={false} />
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
}
