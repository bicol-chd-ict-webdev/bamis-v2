<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ProjectTypeInterface;
use App\Models\ProjectType;
use Illuminate\Database\Eloquent\Collection;

class ProjectTypeRepository implements ProjectTypeInterface
{
    public function create(array $attributes): ProjectType
    {
        return ProjectType::create($attributes);
    }

    public function update(ProjectType $projectType, array $attributes): void
    {
        $projectType->update($attributes);
    }

    public function delete(ProjectType $projectType): void
    {
        $projectType->delete();
    }

    public function list(): Collection
    {
        return ProjectType::withoutTrashed()->latest()->get(['id', 'name', 'code']);
    }

    public function dropdownList(): Collection
    {
        return ProjectType::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
