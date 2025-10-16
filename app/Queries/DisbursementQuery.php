<?php

declare(strict_types=1);

namespace App\Queries;

use App\Models\Disbursement;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use stdClass;

final class DisbursementQuery
{
    public function totalByYear(int $year): float
    {
        $total = Disbursement::query()
            ->whereYear('check_date', $year)
            ->sum(DB::raw('
                COALESCE(net_amount, 0) +
                COALESCE(tax, 0) +
                COALESCE(retention, 0) +
                COALESCE(penalty, 0) +
                COALESCE(absences, 0) +
                COALESCE(other_deductions, 0)
            '));

        return (float) $total;
    }

    /**
     * @return Collection<int, stdClass>
     */
    public function utilizationByYear(int $year): Collection
    {
        return DB::table('disbursements as d')
            ->join('obligations as o', 'd.obligation_id', '=', 'o.id')
            ->join('allocations as a', 'o.allocation_id', '=', 'a.id')
            ->select('a.allotment_class_id', DB::raw('
                SUM(
                    COALESCE(d.net_amount, 0) +
                    COALESCE(d.tax, 0) +
                    COALESCE(d.retention, 0) +
                    COALESCE(d.penalty, 0) +
                    COALESCE(d.absences, 0) +
                    COALESCE(d.other_deductions, 0)
                ) as disbursement
            '))
            ->whereYear('d.check_date', $year)
            ->groupBy('a.allotment_class_id')
            ->get();
    }
}
