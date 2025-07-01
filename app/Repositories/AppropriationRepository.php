<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AppropriationInterface;
use App\Models\Appropriation;
use Illuminate\Database\Eloquent\Collection;

class AppropriationRepository implements AppropriationInterface
{
    public function create(array $attributes): Appropriation
    {
        return Appropriation::create($attributes);
    }

    public function update(Appropriation $appropriation, array $attributes): void
    {
        $appropriation->update($attributes);
    }

    public function delete(Appropriation $appropriation): void
    {
        $appropriation->delete();
    }

    public function list(): Collection
    {
        return Appropriation::withoutTrashed()->latest()->get(['id', 'name', 'acronym']);
    }

    public function dropdownList(): Collection
    {
        return Appropriation::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
