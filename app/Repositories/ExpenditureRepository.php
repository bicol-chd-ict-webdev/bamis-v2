<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ExpenditureInterface;
use App\Models\Expenditure;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

final class ExpenditureRepository implements ExpenditureInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Expenditure
    {
        return Expenditure::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Expenditure $expenditure, array $attributes): bool
    {
        return $expenditure->update($attributes);
    }

    public function delete(Expenditure $expenditure): ?bool
    {
        return $expenditure->delete();
    }

    /**
     * @return Collection<int, Expenditure>
     */
    public function list(): Collection
    {
        return Expenditure::withoutTrashed()
            ->latest()
            ->get(['id', 'name', 'code', 'allotment_class_id']);
    }

    /**
     * @return Collection<int, Expenditure>
     */
    public function comboboxList(?int $allotmentClassId = null): Collection
    {
        return Expenditure::withoutTrashed()
            ->where('allotment_class_id', $allotmentClassId)
            ->oldest('name')
            ->get(['id', 'name']);
    }

    /**
     * @return Collection<int, Expenditure>
     */
    public function listWithObjectDistributionObligationCount(): Collection
    {
        return Expenditure::query()
            ->select([
                'expenditures.id',
                'expenditures.name',
                DB::raw('COUNT(obligations.id) as obligations_count'),
            ])
            ->leftJoin('object_distributions', 'object_distributions.expenditure_id', '=', 'expenditures.id')
            ->leftJoin('obligations', function (JoinClause $join): void {
                $join->on('obligations.object_distribution_id', '=', 'object_distributions.id')
                    ->whereNull([
                        'obligations.norsa_type',
                        'obligations.deleted_at',
                    ])
                    ->whereRaw('(obligations.amount - COALESCE((
                         SELECT SUM(
                             COALESCE(net_amount,0) +
                             COALESCE(tax,0) +
                             COALESCE(retention,0) +
                             COALESCE(penalty,0) +
                             COALESCE(absences,0) +
                             COALESCE(other_deductions,0)
                         )
                         FROM disbursements
                         WHERE disbursements.obligation_id = obligations.id
                     ), 0)) <> 0');
            })
            ->groupBy('expenditures.id', 'expenditures.name')
            ->having('obligations_count', '>', 0)
            ->orderBy('expenditures.name')
            ->get();
    }
}
