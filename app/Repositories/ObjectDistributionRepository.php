<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ObjectDistributionInterface;
use App\Models\ObjectDistribution;
use Illuminate\Database\Eloquent\Collection;

class ObjectDistributionRepository implements ObjectDistributionInterface
{
    public function create(array $attributes): ObjectDistribution
    {
        return ObjectDistribution::create($attributes);
    }

    public function update(ObjectDistribution $objectDistribution, array $attributes): void
    {
        $objectDistribution->update($attributes);
    }

    public function delete(ObjectDistribution $objectDistribution): void
    {
        $objectDistribution->delete();
    }

    public function list(?int $allocationId = null): Collection
    {
        return ObjectDistribution::withoutTrashed()
            ->where('allocation_id', $allocationId)
            ->latest()
            ->get(['id', 'allocation_id', 'expenditure_id', 'amount']);
    }

    public function listWithObligationCount(?int $allocationId = null): Collection
    {
        return ObjectDistribution::query()
            ->withoutTrashed()
            ->select([
                'object_distributions.id',
                'object_distributions.expenditure_id',
                'object_distributions.allocation_id',
                'object_distributions.amount',
            ])
            ->withCount('obligations')
            ->join('expenditures', 'expenditures.id', '=', 'object_distributions.expenditure_id')
            ->when($allocationId !== null, fn ($query) => $query->where('object_distributions.allocation_id', $allocationId))
            ->orderBy('expenditures.name')
            ->with('expenditure')
            ->get();
    }
}
