<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ObjectDistributionInterface;
use App\Models\ObjectDistribution;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

final class ObjectDistributionRepository implements ObjectDistributionInterface
{
    public function create(array $attributes): ObjectDistribution
    {
        return ObjectDistribution::query()->create($attributes);
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

    public function listWithObligationCount(?int $allocationId = null): SupportCollection
    {
        return ObjectDistribution::query()
            ->withoutTrashed()
            ->with(['expenditure:id,name,code'])
            ->withCount('obligations')
            ->when($allocationId !== null, fn ($q) => $q->where('allocation_id', $allocationId))
            ->get()
            ->groupBy('expenditure_id')
            ->map(fn ($objectDistributions): array => [
                'allocation_id' => $objectDistributions->first()?->allocation_id,
                'amount' => $objectDistributions->first()?->amount,
                'expenditure_id' => $objectDistributions->first()?->expenditure_id,
                'expenditure_name' => (string) ($objectDistributions->first()?->expenditure->name ?? ''),
                'obligations_count' => $objectDistributions->sum('obligations_count'),
            ])
            ->filter(fn (array $item): bool => $item['obligations_count'] > 0)
            ->sortBy('expenditure_name')
            ->values();
    }
}
