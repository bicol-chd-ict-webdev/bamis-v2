import { useObligationContext } from '@/contexts/obligation-context';
import { PercentageCalculator } from '@/lib/percentage-calculator';
import { useMemo } from 'react';

export function useObligationStats() {
    const { allocation } = useObligationContext();

    return useMemo(() => {
        const allocationAmount: number = Number(allocation?.amount ?? 0);
        const obligationsSumAmount: number = Number(allocation?.obligations_sum_amount ?? 0);
        const unobligatedBalance: number = Number(allocation.unobligated_balance);
        const obligatedPercentage: number = PercentageCalculator(obligationsSumAmount, allocationAmount, 2);
        const remainingPercentage: number = 100 - obligatedPercentage;

        return {
            allocationAmount,
            obligationsSumAmount,
            unobligatedBalance,
            obligatedPercentage,
            remainingPercentage,
        };
    }, [allocation]);
}
