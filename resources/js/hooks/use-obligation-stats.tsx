import { useObligationContext } from '@/contexts/obligation-context';
import { PercentageCalculator } from '@/lib/percentage-calculator';
import { useMemo } from 'react';

export function useObligationStats() {
    const { allocation } = useObligationContext();

    return useMemo(() => {
        const obligationsAbsoluteSumAmount =
            Array.isArray(allocation?.obligations) && allocation.obligations.length > 0
                ? allocation.obligations.reduce((acc, ob) => acc + Math.abs(ob?.amount), 0)
                : Math.abs(allocation?.obligations_sum_amount);

        const allocationAmount = Number(allocation?.amount ?? 0);
        const obligationsSumAmount = Math.abs(Number(allocation?.obligations_sum_amount ?? 0)); // Converts negative value to positive
        const unobligatedBalance = allocationAmount - obligationsAbsoluteSumAmount;
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
