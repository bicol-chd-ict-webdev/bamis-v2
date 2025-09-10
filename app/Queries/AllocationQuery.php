<?php

declare(strict_types=1);

namespace App\Queries;

use App\Models\Allocation;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use stdClass;

class AllocationQuery
{
    public function totalByYear(int $year): float
    {
        return (float) Allocation::query()
            ->whereYear('date_received', $year)
            ->sum('amount');
    }

    /**
     * @return Collection<int, stdClass>
     */
    public function utilizationByYear(int $year): Collection
    {
        return DB::table('allocations')
            ->select('allotment_class_id', DB::raw('SUM(amount) as allocation'))
            ->whereYear('date_received', $year)
            ->groupBy('allotment_class_id')
            ->get();
    }
}
