<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\ProjectType;
use Illuminate\Database\Eloquent\Collection;

interface ProjectTypeInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): ProjectType;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(ProjectType $projectType, array $attributes): void;

    public function delete(ProjectType $projectType): void;

    /**
     * @return Collection<int, ProjectType>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, ProjectType>
     */
    public function dropdownList(): Collection;
}
