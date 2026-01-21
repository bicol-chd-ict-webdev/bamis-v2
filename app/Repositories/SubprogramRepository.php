<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\SubprogramInterface;
use App\Models\Subprogram;
use Illuminate\Database\Eloquent\Collection;

final class SubprogramRepository implements SubprogramInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Subprogram
    {
        return Subprogram::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Subprogram $subprogram, array $attributes): bool
    {
        return $subprogram->update($attributes);
    }

    public function delete(Subprogram $subprogram): ?bool
    {
        return $subprogram->delete();
    }

    /**
     * @return Collection<int, Subprogram>
     */
    public function list(): Collection
    {
        return Subprogram::withoutTrashed()
            ->latest()
            ->get(['id', 'name', 'program_id', 'code']);
    }

    /**
     * @return Collection<int, Subprogram>
     */
    public function dropdownList(): Collection
    {
        return Subprogram::withoutTrashed()
            ->oldest('name')
            ->get(['id', 'name', 'program_id', 'code']);
    }
}
