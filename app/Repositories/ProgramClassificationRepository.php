<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ProgramClassificationInterface;
use App\Models\ProgramClassification;
use Illuminate\Database\Eloquent\Collection;

class ProgramClassificationRepository implements ProgramClassificationInterface
{
    public function create(array $attributes): ProgramClassification
    {
        return ProgramClassification::create($attributes);
    }

    public function update(ProgramClassification $programClassification, array $attributes): void
    {
        $programClassification->update($attributes);
    }

    public function delete(ProgramClassification $programClassification): void
    {
        $programClassification->delete();
    }

    public function list(): Collection
    {
        return ProgramClassification::withoutTrashed()
            ->latest()
            ->get(['id', 'name', 'code']);
    }
}
