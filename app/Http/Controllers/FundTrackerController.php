<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Support\Helpers\RateCalculator;
use Brick\Math\BigDecimal;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

final class FundTrackerController extends Controller
{
    public function __invoke(Request $request): Response
    {
        // Safe casting using type check instead of ??
        $allocationSum = DB::table('allocations')
            ->whereNull('deleted_at')
            ->whereYear('date_received', 2025)
            ->sum('amount');

        $allocationTotal = is_numeric($allocationSum) ? (float) $allocationSum : 0.0;

        $obligationSum = DB::table('obligations')
            ->whereNull('deleted_at')
            ->whereYear('date', 2025)
            ->sum('amount');

        $obligationTotal = is_numeric($obligationSum) ? (float) $obligationSum : 0.0;

        $disbursementValue = DB::table('disbursements')
            ->whereNull('deleted_at')
            ->whereYear('check_date', 2025)
            ->selectRaw('
                SUM(
                    COALESCE(net_amount, 0) +
                    COALESCE(tax, 0) +
                    COALESCE(retention, 0) +
                    COALESCE(penalty, 0) +
                    COALESCE(absences, 0) +
                    COALESCE(other_deductions, 0)
                ) as total
            ')
            ->value('total');

        $disbursementTotal = is_numeric($disbursementValue) ? (float) $disbursementValue : 0.0;

        /** @var Builder $obligationsByAllocation */
        $obligationsByAllocation = DB::table('obligations')
            ->whereNull('deleted_at')
            ->select('allocation_id', DB::raw('SUM(amount) as obligations_sum_amount'))
            ->whereYear('date', 2025)
            ->groupBy('allocation_id');

        /** @var Builder $disbursementsByAllocation */
        $disbursementsByAllocation = DB::table('disbursements')
            ->whereNull('disbursements.deleted_at')
            ->join('obligations', 'disbursements.obligation_id', '=', 'obligations.id')
            ->select('obligations.allocation_id', DB::raw('SUM(
                COALESCE(disbursements.net_amount,0) +
                COALESCE(disbursements.tax,0) +
                COALESCE(disbursements.retention,0) +
                COALESCE(disbursements.penalty,0) +
                COALESCE(disbursements.absences,0) +
                COALESCE(disbursements.other_deductions,0)
            ) as disbursements_sum_amount'))
            ->whereYear('disbursements.check_date', 2025)
            ->groupBy('obligations.allocation_id');

        /** @var Collection<int, object> $allocations */
        $allocations = DB::table('allocations')
            ->whereNull('allocations.deleted_at')
            ->join('line_items', 'allocations.line_item_id', '=', 'line_items.id')
            ->leftJoinSub($obligationsByAllocation, 'obligation', static function (JoinClause $join): void {
                $join->on('obligation.allocation_id', '=', 'allocations.id');
            })
            ->leftJoinSub($disbursementsByAllocation, 'disbursement', static function (JoinClause $join): void {
                $join->on('disbursement.allocation_id', '=', 'allocations.id');
            })
            ->whereYear('allocations.date_received', 2025)
            ->select([
                'line_items.id as line_item_id',
                'line_items.name as line_item',
                DB::raw('SUM(allocations.amount) as allotment'),
                DB::raw('SUM(COALESCE(obligation.obligations_sum_amount, 0)) as obligation'),
                DB::raw('SUM(COALESCE(disbursement.disbursements_sum_amount, 0)) as disbursement'),
            ])
            ->groupBy('line_items.id', 'line_items.name')
            ->orderBy('line_items.name')
            ->get()
            ->map(static function (object $row): array {
                $allotment = is_numeric($row->allotment ?? null) ? (float) $row->allotment : 0.0;
                $obligation = is_numeric($row->obligation ?? null) ? (float) $row->obligation : 0.0;
                $disbursement = is_numeric($row->disbursement ?? null) ? (float) $row->disbursement : 0.0;

                return [
                    'line_item_id' => isset($row->line_item_id) ? (int) $row->line_item_id : 0,
                    'line_item' => isset($row->line_item) ? (string) $row->line_item : '',
                    'allotment' => BigDecimal::of($allotment),
                    'obligation' => BigDecimal::of($obligation),
                    'unobligated_balance' => BigDecimal::of($allotment - $obligation),
                    'obligation_rate' => RateCalculator::calculate($obligation, $allotment)->__toString(),
                    'disbursement' => BigDecimal::of($disbursement),
                    'unpaid_obligation' => BigDecimal::of($obligation - $disbursement),
                    'disbursement_rate' => RateCalculator::calculate($disbursement, $obligation)->__toString(),
                ];
            });

        /** @var Collection<int, object> $allocationPieChartByAllotmentClass */
        $allocationPieChartByAllotmentClass = DB::table('allocations')
            ->join('allotment_classes', 'allotment_classes.id', '=', 'allocations.allotment_class_id')
            ->whereNull(['allocations.deleted_at', 'allotment_classes.deleted_at'])
            ->select([
                'allotment_classes.acronym as allotment_class',
                DB::raw('SUM(allocations.amount) as amount'),
            ])
            ->groupBy('allotment_classes.acronym')
            ->get();

        /** @var Collection<int, object> $allocationBarChartByAllotmentClass */
        $allocationBarChartByAllotmentClass = DB::table('allocations')
            ->join('allotment_classes', 'allotment_classes.id', '=', 'allocations.allotment_class_id')
            ->leftJoinSub($obligationsByAllocation, 'obligation', static function (JoinClause $join): void {
                $join->on('obligation.allocation_id', '=', 'allocations.id');
            })
            ->leftJoinSub($disbursementsByAllocation, 'disbursement', static function (JoinClause $join): void {
                $join->on('disbursement.allocation_id', '=', 'allocations.id');
            })
            ->whereNull(['allocations.deleted_at', 'allotment_classes.deleted_at'])
            ->select([
                'allotment_classes.acronym as allotment_class',
                DB::raw('SUM(DISTINCT allocations.amount) as allocation'),
                DB::raw('SUM(COALESCE(obligation.obligations_sum_amount, 0)) as obligation'),
                DB::raw('SUM(COALESCE(disbursement.disbursements_sum_amount, 0)) as disbursement'),
            ])
            ->groupBy('allotment_classes.id', 'allotment_classes.acronym')
            ->orderBy('allotment_classes.id')
            ->get();

        return Inertia::render('fund-tracker', [
            'allotment' => BigDecimal::of($allocationTotal),
            'obligation' => BigDecimal::of($obligationTotal),
            'obligationRate' => RateCalculator::calculate($obligationTotal, $allocationTotal)->__toString(),
            'disbursement' => BigDecimal::of($disbursementTotal),
            'disbursementRate' => RateCalculator::calculate($disbursementTotal, $obligationTotal)->__toString(),
            'allocations' => static fn (): Collection => $allocations,
            'allocationPieChart' => static fn (): Collection => $allocationPieChartByAllotmentClass,
            'allocationBarChart' => static fn (): Collection => $allocationBarChartByAllotmentClass,
        ]);
    }
}
