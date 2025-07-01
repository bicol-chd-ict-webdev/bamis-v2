<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\SubprogramInterface;
use App\Models\Subprogram;
use Illuminate\Database\Eloquent\Collection;

class SubprogramRepository implements SubprogramInterface
{
    public function create(array $attributes): Subprogram
    {
        return Subprogram::create($attributes);
    }

    public function update(Subprogram $subprogram, array $attributes): void
    {
        $subprogram->update($attributes);
    }

    public function delete(Subprogram $subprogram): void
    {
        $subprogram->delete();
    }

    public function list(): Collection
    {
        return Subprogram::withoutTrashed()->latest()->get(['id', 'name', 'program_id']);
    }

    public function dropdownList(): Collection
    {
        return Subprogram::withoutTrashed()->oldest('name')->get(['id', 'name', 'program_id']);
    }
}
