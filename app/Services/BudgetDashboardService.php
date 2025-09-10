<?php

declare(strict_types=1);

namespace App\Services;

use App\Queries\AllocationQuery;
use App\Queries\DisbursementQuery;
use App\Queries\ObligationQuery;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Illuminate\Support\Collection;
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
     *   totalAllocations: float,
     *   totalObligations: float,
     *   totalDisbursements: float,
     *   obligationRate: string,
     *   disbursementRate: string,
     *   budgetUtilizations: array<mixed>,
     *   allocationPieChart: array<mixed>
     * }
     */
    public function getDashboardData(int $year): array
    {
        $totalAllocations = $this->allocationQuery->totalByYear($year);
        $totalObligations = $this->obligationQuery->totalByYear($year);
        $totalDisbursements = $this->disbursementQuery->totalByYear($year);

        $allocations = $this->allocationQuery->utilizationByYear($year)->keyBy('allotment_class_id');
        $obligations = $this->obligationQuery->utilizationByYear($year)->keyBy('allotment_class_id');
        $disbursements = $this->disbursementQuery->utilizationByYear($year)->keyBy('allotment_class_id');
        $allotmentClasses = $this->getAllotmentClasses();

        return [
            'totalAllocations' => $totalAllocations,
            'totalObligations' => $totalObligations,
            'totalDisbursements' => $totalDisbursements,
            'obligationRate' => (string) $this->calculateRate($totalObligations, $totalAllocations),
            'disbursementRate' => (string) $this->calculateRate($totalDisbursements, $totalObligations),
            'budgetUtilizations' => $this->mapUtilizations($allotmentClasses, $allocations, $obligations, $disbursements),
            'allocationPieChart' => $this->mapAllocations($allotmentClasses, $allocations),
        ];
    }

    /**
     * @param  Collection<int, stdClass>  $classes
     * @param  Collection<int|string, stdClass>  $allocations
     * @param  Collection<int|string, stdClass>  $obligations
     * @param  Collection<int|string, stdClass>  $disbursements
     * @return array<mixed>
     */
    private function mapUtilizations(Collection $classes, Collection $allocations, Collection $obligations, Collection $disbursements): array
    {
        return $classes->map(fn (stdClass $class): array => [
            'allotmentClass' => $class->allotmentClass,
            'allocation' => $allocations[$class->id]->allocation ?? 0.0,
            'obligation' => $obligations[$class->id]->obligation ?? 0.0,
            'disbursement' => $disbursements[$class->id]->disbursement ?? 0.0,
        ])->toArray();
    }

    /**
     * @param  Collection<int, stdClass>  $classes
     * @param  Collection<int|string, stdClass>  $allocations
     * @return array<mixed>
     */
    private function mapAllocations(Collection $classes, Collection $allocations): array
    {
        return $classes->map(fn (stdClass $class): array => [
            'allotmentClass' => $class->allotmentClass,
            'allocation' => $allocations[$class->id]->allocation ?? 0.0,
        ])->toArray();
    }

    /**
     * Fetch allotment classes once.
     *
     * @return Collection<int, stdClass>
     */
    private function getAllotmentClasses(): Collection
    {
        return DB::table('allotment_classes as ac')
            ->select(['ac.id', 'ac.acronym as allotmentClass'])
            ->get();
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
