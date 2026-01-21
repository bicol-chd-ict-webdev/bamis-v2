<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Summary;

use App\Models\Allocation;
use DB;
use Illuminate\Support\Collection;
use stdClass;

final class SummaryDataProviderService
{
    /**
     * @return Collection<int, array{name: string, code: string, obligation: float, disbursements: float}>
     */
    public function getSummaryData(Allocation $allocation): Collection
    {
        return $this->fetchGroupedObligations($allocation)
            ->map(fn (object $row): array => $this->transformRow($row));
    }

    /**
     * @return Collection<int, stdClass>
     */
    private function fetchGroupedObligations(Allocation $allocation): Collection
    {
        return $allocation->obligations()
            ->join('expenditures', 'obligations.expenditure_id', '=', 'expenditures.id')
            ->leftJoin('disbursements', 'obligations.id', '=', 'disbursements.obligation_id')
            ->select(
                'expenditures.code',
                'expenditures.name',
                DB::raw('SUM(obligations.amount) as obligation'),
                DB::raw('COALESCE(SUM(
                    COALESCE(disbursements.net_amount, 0) +
                    COALESCE(disbursements.tax, 0) +
                    COALESCE(disbursements.retention, 0) +
                    COALESCE(disbursements.penalty, 0) +
                    COALESCE(disbursements.absences, 0) +
                    COALESCE(disbursements.other_deductions, 0)
                ), 0) as disbursements')
            )
            ->groupBy('expenditures.id', 'expenditures.code', 'expenditures.name')
            ->toBase()
            ->get();
    }

    /**
     * @param  stdClass  $row
     * @return array{name: string, code: string, obligation: float, disbursements: float}
     */
    private function transformRow(object $row): array
    {
        /** @var object{code: string, name: string, obligation: float|int|string, disbursements: float|int|string} $row */
        $obligation = (float) $row->obligation;
        $disbursements = (float) $row->disbursements;

        return [
            'name' => $row->name,
            'code' => $row->code,
            'obligation' => $obligation,
            'disbursements' => $disbursements,
        ];
    }
}
