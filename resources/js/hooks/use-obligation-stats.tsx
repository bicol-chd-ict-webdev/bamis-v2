import { useObligationContext } from '@/contexts/obligation-context';
import { PercentageCalculator } from '@/lib/percentage-calculator';
import { useMemo } from 'react';

export function useObligationStats() {
    const { allocation } = useObligationContext();

    return useMemo(() => {
        const allocationAmount = Number(allocation?.amount ?? 0);
        // const obligationsSumAmount = Number(allocation?.obligations_sum_amount ?? 0); // Original code
        const obligationsSumAmount = Math.abs(Number(allocation?.obligations_sum_amount ?? 0)); // Converts negative value to positive
        const unobligatedBalance = allocationAmount - obligationsSumAmount;
        const obligatedPercentage = PercentageCalculator(obligationsSumAmount, allocationAmount, 2);
        const remainingPercentage = 100 - obligatedPercentage;

        return {
            allocationAmount,
            obligationsSumAmount,
            unobligatedBalance,
            obligatedPercentage,
            remainingPercentage,
        };
    }, [allocation]);
}
