import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useObligationStats } from '@/hooks/use-obligation-stats';
import { FormatMoney, FormatPercentage } from '@/lib/formatter';
import { JSX } from 'react';

const ObligationProgress = (): JSX.Element => {
    const { allocationAmount, unobligatedBalance, obligatedPercentage, remainingPercentage } = useObligationStats();

    return (
        <Card>
            <CardContent className="text-sm">
                <div className="mb-3 flex flex-col gap-1">
                    <div className="flex justify-between gap-1.5">
                        <p>Allocation Amount</p>
                        <p>Unobligated Balance</p>
                    </div>
                    <div className="flex justify-between gap-1.5">
                        <p className="text-lg font-bold">{FormatMoney(allocationAmount)}</p>
                        <p className="text-lg font-bold">{FormatMoney(Number(unobligatedBalance))}</p>
                    </div>
                </div>

                <Progress max={100} value={obligatedPercentage} />

                <div className="mt-1 flex justify-between gap-1.5">
                    <p>{FormatPercentage(obligatedPercentage, 2)}</p>
                    <p>{FormatPercentage(remainingPercentage, 2)}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ObligationProgress;
