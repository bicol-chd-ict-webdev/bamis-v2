import { ReactNode } from 'react';

interface StatisticCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    rate?: string; // optional (only for obligations/disbursements)
    highlightRate?: boolean; // highlight percentage in red if true
}

export default function StatisticCard({ title, value, icon, rate, highlightRate = false }: StatisticCardProps) {
    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative grid gap-2 rounded-lg border p-4">
            <div className="flex items-center justify-between">
                <div className="border-sidebar-border/70 dark:border-sidebar-border shrink-0 rounded-lg border p-2">{icon}</div>
                {rate && <h1 className={`text-xl font-bold ${highlightRate ? 'text-destructive' : ''}`}>{rate}</h1>}
            </div>
            <h4>{title}</h4>
            <h1 className="text-3xl font-bold">{value}</h1>
        </div>
    );
}
