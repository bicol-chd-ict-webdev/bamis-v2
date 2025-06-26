<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\PapTypeInterface;
use App\Models\PapType;
use Illuminate\Database\Eloquent\Collection;

class PapTypeRepository implements PapTypeInterface
{
    public function create(array $attributes): PapType
    {
        return PapType::create($attributes);
    }

    public function update(PapType $papType, array $attributes): void
    {
        $papType->update($attributes);
    }

    public function delete(PapType $papType): void
    {
        $papType->delete();
    }

    public function list(): Collection
    {
        return PapType::withoutTrashed()->latest()->get(['id', 'name', 'code']);
    }
}
