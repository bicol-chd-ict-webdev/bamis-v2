export function PercentageCalculator(part: number, total: number, decimals: number = 0): number {
    if (total === 0) return 0;

    const raw = (part / total) * 100;

    return parseFloat(raw.toFixed(decimals));
}
