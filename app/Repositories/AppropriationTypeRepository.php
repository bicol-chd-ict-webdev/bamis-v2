<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AppropriationTypeInterface;
use App\Models\AppropriationType;
use Illuminate\Database\Eloquent\Collection;

class AppropriationTypeRepository implements AppropriationTypeInterface
{
    public function create(array $attributes): AppropriationType
    {
        return AppropriationType::create($attributes);
    }

    public function update(AppropriationType $Appropriationtype, array $attributes): void
    {
        $Appropriationtype->update($attributes);
    }

    public function delete(AppropriationType $Appropriationtype): void
    {
        $Appropriationtype->delete();
    }

    public function list(): Collection
    {
        return AppropriationType::latest()->get(['id', 'name', 'acronym', 'code']);
    }
}
