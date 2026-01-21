<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AllotmentClassInterface;
use App\Models\AllotmentClass;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

final class AllotmentClassRepository implements AllotmentClassInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): AllotmentClass
    {
        return AllotmentClass::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(AllotmentClass $allotmentClass, array $attributes): bool
    {
        return $allotmentClass->update($attributes);
    }

    public function delete(AllotmentClass $allotmentClass): ?bool
    {
        return $allotmentClass->delete();
    }

    /**
     * @return Collection<int, AllotmentClass>
     */
    public function list(): Collection
    {
        return AllotmentClass::withoutTrashed()->latest()->get(['id', 'name', 'acronym', 'code']);
    }

    /**
     * @return Collection<int, AllotmentClass>
     */
    public function listWithAllocationCount(?int $appropriationId = null): Collection
    {
        return AllotmentClass::withoutTrashed()
            ->withCount(['allocations' => fn (Builder $query): Builder => $query->where('appropriation_id', $appropriationId)])
            ->oldest('name')
            ->get(['id', 'name', 'acronym']);
    }

    /**
     * @return Collection<int, AllotmentClass>
     */
    public function listWithExpenditureCount(): Collection
    {
        return AllotmentClass::withoutTrashed()
            ->withCount('expenditures')
            ->oldest('name')->get(['id', 'name', 'acronym']);
    }

    /**
     * @return Collection<int, AllotmentClass>
     */
    public function dropdownList(): Collection
    {
        return AllotmentClass::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
