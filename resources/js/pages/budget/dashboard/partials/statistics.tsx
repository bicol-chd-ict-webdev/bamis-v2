import StatisticCard from '@/components/statistics-card';
import { FormatMoney, FormatPercentage } from '@/lib/formatter';
import { HandCoins, Shapes } from 'lucide-react';

interface StatisticsProps {
    totalAllocations: number;
    totalObligations: number;
    totalDisbursements: number;
    obligationRate: string;
    disbursementRate: string;
}

export default function Statistics({ totalAllocations, totalObligations, totalDisbursements, obligationRate, disbursementRate }: StatisticsProps) {
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatisticCard title="Allocations" value={FormatMoney(totalAllocations)} icon={<Shapes />} />
            <StatisticCard
                title="Obligations"
                value={FormatMoney(totalObligations)}
                icon={<HandCoins />}
                rate={FormatPercentage(obligationRate)}
                highlightRate
            />
            <StatisticCard
                title="Disbursements"
                value={FormatMoney(totalDisbursements)}
                icon={<HandCoins />}
                rate={FormatPercentage(disbursementRate)}
                highlightRate
            />
        </div>
    );
}
