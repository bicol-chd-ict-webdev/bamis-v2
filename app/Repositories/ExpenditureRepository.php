<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ExpenditureInterface;
use App\Models\Expenditure;
use Illuminate\Database\Eloquent\Collection;

class ExpenditureRepository implements ExpenditureInterface
{
    public function create(array $attributes): Expenditure
    {
        return Expenditure::create($attributes);
    }

    public function update(Expenditure $expenditure, array $attributes): void
    {
        $expenditure->update($attributes);
    }

    public function delete(Expenditure $expenditure): void
    {
        $expenditure->delete();
    }

    public function list(): Collection
    {
        return Expenditure::withoutTrashed()
            ->latest()
            ->get(['id', 'name', 'code', 'allotment_class_id']);
    }

    public function comboboxList(?int $allotmentClassId = null): Collection
    {
        return Expenditure::withoutTrashed()
            ->where('allotment_class_id', $allotmentClassId)
            ->oldest('name')
            ->get(['id', 'name']);
    }
}
