<?php

declare(strict_types=1);

namespace App\Services;

use App\Queries\AllocationQuery;
use App\Queries\DisbursementQuery;
use App\Queries\ObligationQuery;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Illuminate\Support\Facades\DB;
use stdClass;

class BudgetDashboardService
{
    public function __construct(
        private readonly AllocationQuery $allocationQuery,
        private readonly ObligationQuery $obligationQuery,
        private readonly DisbursementQuery $disbursementQuery,
    ) {}

    /**
     * @return array{
     *     totalAllocations: float,
     *     totalObligations: float,
     *     totalDisbursements: float,
     *     obligationRate: string,
     *     disbursementRate: string,
     *     budgetUtilizations: array<int, array{
     *         allotmentClass: string,
     *         allocation: float,
     *         obligation: float,
     *         disbursement: float
     *     }>
     * }
     */
    public function getDashboardData(int $year): array
    {
        $totalAllocations = $this->allocationQuery->totalByYear($year);
        $totalObligations = $this->obligationQuery->totalByYear($year);
        $totalDisbursements = $this->disbursementQuery->totalByYear($year);

        return [
            'totalAllocations' => $totalAllocations,
            'totalObligations' => $totalObligations,
            'totalDisbursements' => $totalDisbursements,
            'obligationRate' => (string) $this->calculateRate($totalObligations, $totalAllocations),
            'disbursementRate' => (string) $this->calculateRate($totalDisbursements, $totalObligations),
            'budgetUtilizations' => $this->utilizationByAllotmentClass($year),
            'allocationPieChart' => $this->allocationByAllotmentClass($year),
        ];
    }

    /**
     * @param int $year
     * @return array<int, array{allotmentClass: string, allocation: float, obligation: float, disbursement: float}>
     */
    private function utilizationByAllotmentClass(int $year): array
    {
        $allocations = $this->allocationQuery->utilizationByYear($year)->keyBy('allotment_class_id');
        $obligations = $this->obligationQuery->utilizationByYear($year)->keyBy('allotment_class_id');
        $disbursements = $this->disbursementQuery->utilizationByYear($year)->keyBy('allotment_class_id');

        /** @var array<int, array{allotmentClass: string, allocation: float, obligation: float, disbursement: float}> $result */
        $result = DB::table('allotment_classes as ac')
            ->select(['ac.id', 'ac.acronym as allotmentClass'])
            ->get()
            ->map(fn (stdClass $class): array => [
                'allotmentClass' => $class->allotmentClass,
                'allocation' => ($allocations[$class->id]->allocation ?? 0.0),
                'obligation' => ($obligations[$class->id]->obligation ?? 0.0),
                'disbursement' => ($disbursements[$class->id]->disbursement ?? 0.0),
            ])
            ->toArray();

        return $result;
    }

    /**
     * @param int $year
     * @return array<int, array{allotmentClass: string, allocation: float}>
     */
    private function allocationByAllotmentClass(int $year): array
    {
        $allocations = $this->allocationQuery->utilizationByYear($year)->keyBy('allotment_class_id');

        /** @var array<int, array{allotmentClass: string, allocation: float}> $result */
        $result = DB::table('allotment_classes as ac')
            ->select(['ac.id', 'ac.acronym as allotmentClass'])
            ->get()
            ->map(fn (stdClass $class): array => [
                'allotmentClass' => $class->allotmentClass,
                'allocation' => ($allocations[$class->id]->allocation ?? 0.0),
            ])
            ->toArray();

        return $result;
    }

    private function calculateRate(float $numerator, float $denominator): BigDecimal
    {
        if ($denominator <= 0) {
            return BigDecimal::of('0');
        }

        return BigDecimal::of((string) $numerator)
            ->dividedBy(BigDecimal::of((string) $denominator), 4, RoundingMode::HALF_UP)
            ->multipliedBy(100)
            ->toScale(2, RoundingMode::HALF_UP);
    }
}
