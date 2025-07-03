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
}
