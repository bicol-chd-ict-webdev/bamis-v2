<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\DivisionInterface;
use App\Models\Division;
use Illuminate\Support\Collection;

final class DivisionRepository implements DivisionInterface
{
    public function create(array $attributes): Division
    {
        return Division::query()->create($attributes);
    }

    public function update(Division $division, array $attributes): void
    {
        $division->update($attributes);
    }

    public function delete(Division $division): void
    {
        $division->delete();
    }

    public function list(): Collection
    {
        return Division::query()->latest()->get(['id', 'name', 'acronym']);
    }

    public function listWithSectionCount(): Collection
    {
        return Division::query()->withCount('sections')->oldest('name')->get(['id', 'name', 'acronym']);
    }
}
