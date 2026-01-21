<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ProgramClassificationInterface;
use App\Models\ProgramClassification;
use Illuminate\Database\Eloquent\Collection;

final class ProgramClassificationRepository implements ProgramClassificationInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): ProgramClassification
    {
        return ProgramClassification::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(ProgramClassification $programClassification, array $attributes): bool
    {
        return $programClassification->update($attributes);
    }

    public function delete(ProgramClassification $programClassification): ?bool
    {
        return $programClassification->delete();
    }

    /**
     * @return Collection<int, ProgramClassification>
     */
    public function list(): Collection
    {
        return ProgramClassification::withoutTrashed()
            ->latest()
            ->get(['id', 'name', 'code']);
    }
}
