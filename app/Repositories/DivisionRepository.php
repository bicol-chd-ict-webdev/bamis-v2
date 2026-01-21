<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\DivisionInterface;
use App\Models\Division;
use Illuminate\Support\Collection;

final class DivisionRepository implements DivisionInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Division
    {
        return Division::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Division $division, array $attributes): bool
    {
        return $division->update($attributes);
    }

    public function delete(Division $division): ?bool
    {
        return $division->delete();
    }

    /**
     * @return Collection<int, Division>
     */
    public function list(): Collection
    {
        return Division::query()
            ->latest()->get(['id', 'name', 'acronym']);
    }

    /**
     * @return Collection<int, Division>
     */
    public function listWithSectionCount(): Collection
    {
        return Division::query()
            ->withCount('sections')
            ->oldest('name')->get(['id', 'name', 'acronym']);
    }
}
