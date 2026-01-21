<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AppropriationInterface;
use App\Models\Appropriation;
use Illuminate\Database\Eloquent\Collection;

final class AppropriationRepository implements AppropriationInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Appropriation
    {
        return Appropriation::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Appropriation $appropriation, array $attributes): bool
    {
        return $appropriation->update($attributes);
    }

    public function delete(Appropriation $appropriation): ?bool
    {
        return $appropriation->delete();
    }

    /**
     * @return Collection<int, Appropriation>
     */
    public function list(): Collection
    {
        return Appropriation::withoutTrashed()->latest()->get(['id', 'name', 'acronym']);
    }

    /**
     * @return Collection<int, Appropriation>
     */
    public function dropdownList(): Collection
    {
        return Appropriation::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
