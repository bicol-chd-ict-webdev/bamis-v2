<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ProgramInterface;
use App\Models\Program;
use Illuminate\Database\Eloquent\Collection;

final class ProgramRepository implements ProgramInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Program
    {
        return Program::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Program $program, array $attributes): bool
    {
        return $program->update($attributes);
    }

    public function delete(Program $program): ?bool
    {
        return $program->delete();
    }

    /**
     * @return Collection<int, Program>
     */
    public function list(): Collection
    {
        return Program::withoutTrashed()
            ->with('programClassification')
            ->latest()
            ->get(['id', 'name', 'appropriation_source', 'program_classification_id', 'code']);
    }

    /**
     * @return Collection<int, Program>
     */
    public function listOrderByName(): Collection
    {
        return Program::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }

    /**
     * @return Collection<int, Program>
     */
    public function dropdownList(): Collection
    {
        return Program::withoutTrashed()->oldest('name')->get(['id', 'name', 'appropriation_source']);
    }
}
