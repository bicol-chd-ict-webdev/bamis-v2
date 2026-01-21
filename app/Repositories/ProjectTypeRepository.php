<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ProjectTypeInterface;
use App\Models\ProjectType;
use Illuminate\Database\Eloquent\Collection;

final class ProjectTypeRepository implements ProjectTypeInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): ProjectType
    {
        return ProjectType::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(ProjectType $projectType, array $attributes): bool
    {
        return $projectType->update($attributes);
    }

    public function delete(ProjectType $projectType): ?bool
    {
        return $projectType->delete();
    }

    /**
     * @return Collection<int, ProjectType>
     */
    public function list(): Collection
    {
        return ProjectType::withoutTrashed()->latest()->get(['id', 'name', 'code']);
    }

    /**
     * @return Collection<int, ProjectType>
     */
    public function dropdownList(): Collection
    {
        return ProjectType::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
