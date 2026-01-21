<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AppropriationTypeInterface;
use App\Models\AppropriationType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

final class AppropriationTypeRepository implements AppropriationTypeInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): AppropriationType
    {
        return AppropriationType::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(AppropriationType $appropriationType, array $attributes): bool
    {
        return $appropriationType->update($attributes);
    }

    public function delete(AppropriationType $appropriationType): ?bool
    {
        return $appropriationType->delete();
    }

    public function list(): Collection
    {
        return AppropriationType::withoutTrashed()->latest()->get(['id', 'name', 'acronym', 'code']);
    }

    public function listWithAllocationCount(?int $appropriationId = null): Collection
    {
        return AppropriationType::withoutTrashed()
            ->withCount(['allocations' => fn (Builder $query): Builder => $query->where('appropriation_id', $appropriationId)])
            ->oldest('name')
            ->get(['id', 'name', 'acronym']);
    }

    public function dropdownList(): Collection
    {
        return AppropriationType::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
