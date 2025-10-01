<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\OfficeAllotmentInterface;
use App\Models\OfficeAllotment;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class OfficeAllotmentRepository implements OfficeAllotmentInterface
{
    public function create(array $attributes): OfficeAllotment
    {
        return OfficeAllotment::create($attributes);
    }

    public function update(OfficeAllotment $officeAllotment, array $attributes): void
    {
        $officeAllotment->update($attributes);
    }

    public function delete(OfficeAllotment $officeAllotment): void
    {
        $officeAllotment->delete();
    }

    public function list(?int $allocationId = null): Collection
    {
        return OfficeAllotment::withoutTrashed()
            ->where('allocation_id', $allocationId)
            ->latest()
            ->get(['id', 'allocation_id', 'section_id', 'amount']);
    }

    public function listWithObligationCount(?int $allocationId = null, bool $withZeroBalance = true): Collection
    {
        return OfficeAllotment::query()
            ->select([
                'office_allotments.id',
                'office_allotments.allocation_id',
                'office_allotments.amount',
                'office_allotments.section_id',
                DB::raw('COUNT(obligations.id) as obligations_count'),
            ])
            ->leftJoin('obligations', function (JoinClause $join) use ($withZeroBalance): void {
                $join->on('obligations.office_allotment_id', '=', 'office_allotments.id')
                    ->whereNull([
                        'obligations.norsa_type',
                        'obligations.deleted_at',
                    ]);

                // Apply non-zero balance filter only if requested
                if ($withZeroBalance) {
                    $join->whereRaw('(obligations.amount - COALESCE((
                     SELECT SUM(
                         COALESCE(net_amount, 0) +
                         COALESCE(tax, 0) +
                         COALESCE(retention, 0) +
                         COALESCE(penalty, 0) +
                         COALESCE(absences, 0) +
                         COALESCE(other_deductions, 0)
                     )
                     FROM disbursements
                     WHERE disbursements.obligation_id = obligations.id
                 ), 0)) <> 0');
                }
            })
            ->when($allocationId !== null, fn ($query) => $query->where('office_allotments.allocation_id', $allocationId))
            ->groupBy(
                'office_allotments.id',
                'office_allotments.allocation_id',
                'office_allotments.amount',
                'office_allotments.section_id'
            )
            ->having('obligations_count', '>', 0)
            ->orderBy('office_allotments.id')
            ->get();
    }
}
