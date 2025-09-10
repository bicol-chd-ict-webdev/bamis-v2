<?php

declare(strict_types=1);

namespace App\Queries;

use App\Models\Obligation;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use stdClass;

class ObligationQuery
{
    public function totalByYear(int $year): float
    {
        return (float) Obligation::query()
            ->whereYear('date', $year)
            ->sum('amount');
    }

    /**
     * @return Collection<int, stdClass>
     */
    public function utilizationByYear(int $year): Collection
    {
        return DB::table('obligations as o')
            ->join('allocations as a', 'o.allocation_id', '=', 'a.id')
            ->select('a.allotment_class_id', DB::raw('SUM(o.amount) as obligation'))
            ->whereYear('o.date', $year)
            ->groupBy('a.allotment_class_id')
            ->get();
    }
}
