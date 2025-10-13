<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AllotmentClassInterface;
use App\Models\AllotmentClass;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

final class AllotmentClassRepository implements AllotmentClassInterface
{
    public function create(array $attributes): AllotmentClass
    {
        return AllotmentClass::query()->create($attributes);
    }

    public function update(AllotmentClass $allotmentClass, array $attributes): void
    {
        $allotmentClass->update($attributes);
    }

    public function delete(AllotmentClass $allotmentClass): void
    {
        $allotmentClass->delete();
    }

    public function list(): Collection
    {
        return AllotmentClass::withoutTrashed()->latest()->get(['id', 'name', 'acronym', 'code']);
    }

    public function listWithAllocationCount(?int $appropriationId = null): Collection
    {
        return AllotmentClass::withoutTrashed()
            ->withCount(['allocations' => fn (Builder $query): Builder => $query->where('appropriation_id', $appropriationId)])
            ->oldest('name')
            ->get(['id', 'name', 'acronym']);
    }

    public function listWithExpenditureCount(): Collection
    {
        return AllotmentClass::withoutTrashed()->withCount('expenditures')->oldest('name')->get(['id', 'name', 'acronym']);
    }

    public function dropdownList(): Collection
    {
        return AllotmentClass::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
