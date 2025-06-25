<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AllotmentClassInterface;
use App\Models\AllotmentClass;
use Illuminate\Database\Eloquent\Collection;

class AllotmentClassRepository implements AllotmentClassInterface
{
    public function create(array $attributes): AllotmentClass
    {
        return AllotmentClass::create($attributes);
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

    public function listWithExpenditureCount(): Collection
    {
        return AllotmentClass::withoutTrashed()->withCount('expenditures')->oldest('name')->get(['id', 'name', 'acronym']);
    }
}
