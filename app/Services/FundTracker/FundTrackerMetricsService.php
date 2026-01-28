<?php

declare(strict_types=1);

namespace App\Services\FundTracker;

use App\Models\Allocation;
use App\Models\Disbursement;
use App\Models\Obligation;
use App\Models\Section;
use App\Support\Helpers\RateCalculator;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;

final class FundTrackerMetricsService
{
    /**
     * @return array<string, mixed>
     */
    public function getMetrics(?int $year = null): array
    {
        return $this->computeMetrics($year);
    }

    /**
     * @return array<string, mixed>
     */
    public function getSectionMetrics(Section $section, ?int $year = null): array
    {
        return $this->computeMetrics($year, $section);
    }

    /**
     * @return array<string, mixed>
     */
    private function computeMetrics(?int $year = null, ?Section $section = null): array
    {
        $year ??= now()->year;
        $previousYear = $year - 1;

        $allocationAmounts = $this->getAllocationAmounts($previousYear, $year, $section);
        $previousAllocationAmount = (float) ($allocationAmounts[$previousYear] ?? 0);
        $allocationAmount = (float) ($allocationAmounts[$year] ?? 0);

        $obligationAmount = $this->getObligationAmount($year, $section);
        $disbursementTotal = $this->getDisbursementTotal($year, $section);

        return [
            'allocation' => [
                'amount' => $allocationAmount,
                'rate' => $this->calculatePercentageChange($allocationAmount, $previousAllocationAmount),
            ],
            'obligation' => [
                'amount' => $obligationAmount,
                'rate' => RateCalculator::calculate($obligationAmount, $allocationAmount, 0)->__toString(),
            ],
            'disbursement' => [
                'amount' => $disbursementTotal,
                'rate' => RateCalculator::calculate($disbursementTotal, $obligationAmount, 0)->__toString(),
            ],
            'balance' => $allocationAmount - $obligationAmount,
        ];
    }

    /**
     * @return array<int, float>
     */
    private function getAllocationAmounts(int $previousYear, int $currentYear, ?Section $section = null): array
    {
        /** @var array<int, float> $result */
        $result = Allocation::query()
            ->when($section, function ($query, Section $section): void {
                $query->join('office_allotments', 'allocations.id', '=', 'office_allotments.allocation_id')
                    ->where('office_allotments.section_id', $section->id)
                    ->selectRaw('YEAR(date_received) as year, SUM(office_allotments.amount) as total');
            }, function ($query): void {
                $query->selectRaw('YEAR(date_received) as year, SUM(amount) as total');
            })
            ->whereYear('date_received', '>=', $previousYear)
            ->whereYear('date_received', '<=', $currentYear)
            ->groupByRaw('YEAR(date_received)')
            ->pluck('total', 'year')
            ->toArray();

        return $result;
    }

    private function getObligationAmount(int $year, ?Section $section = null): float
    {
        $result = Obligation::query()
            ->when($section, function ($query, Section $section): void {
                $query->join('office_allotments', 'obligations.office_allotment_id', '=', 'office_allotments.id')
                    ->where('office_allotments.section_id', $section->id);
            })
            ->whereYear('date', $year)
            ->sum('obligations.amount');

        return (float) $result;
    }

    private function getDisbursementTotal(int $year, ?Section $section = null): float
    {
        $result = Disbursement::query()
            ->when($section, function ($query, Section $section): void {
                $query->join('obligations', 'disbursements.obligation_id', '=', 'obligations.id')
                    ->join('office_allotments', 'obligations.office_allotment_id', '=', 'office_allotments.id')
                    ->where('office_allotments.section_id', $section->id);
            })
            ->whereYear('disbursements.check_date', $year)
            ->totalDisbursements()
            ->first();

        return (float) ($result->total ?? 0);
    }

    private function calculatePercentageChange(float $current, float $previous): string
    {
        $currentDecimal = BigDecimal::of($current);
        $previousDecimal = BigDecimal::of($previous);

        if ($previousDecimal->isZero()) {
            return '0';
        }

        $percentage = $currentDecimal
            ->minus($previousDecimal)
            ->dividedBy($previousDecimal, 2, RoundingMode::HALF_UP)
            ->multipliedBy(100);

        return $percentage->toScale(0, RoundingMode::HALF_UP)->__toString();
    }
}
