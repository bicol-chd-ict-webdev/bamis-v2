<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ProgramInterface;
use App\Models\Program;
use Illuminate\Database\Eloquent\Collection;

class ProgramRepository implements ProgramInterface
{
    public function create(array $attributes): Program
    {
        return Program::create($attributes);
    }

    public function update(Program $program, array $attributes): void
    {
        $program->update($attributes);
    }

    public function delete(Program $program): void
    {
        $program->delete();
    }

    public function list(): Collection
    {
        return Program::withoutTrashed()
            ->with('programClassification')
            ->latest()
            ->get(['id', 'name', 'appropriation_source', 'program_classification_id', 'code']);
    }

    public function listOrderByName(): Collection
    {
        return Program::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }

    public function dropdownList(): Collection
    {
        return Program::withoutTrashed()->oldest('name')->get(['id', 'name', 'appropriation_source']);
    }
}
