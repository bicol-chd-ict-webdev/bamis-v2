<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\AllocationInterface;
use App\Models\Allocation;
use Illuminate\Database\Eloquent\Collection;

class AllocationRepository implements AllocationInterface
{
    public function create(array $attributes): Allocation
    {
        return Allocation::create($attributes);
    }

    public function update(Allocation $allocation, array $attributes): void
    {
        $allocation->update($attributes);
    }

    public function delete(Allocation $allocation): void
    {
        $allocation->delete();
    }

    public function list(): Collection
    {
        return Allocation::withoutTrashed()->latest()->get([
            'id',
            'amount',
            'date_received',
            'line_item_id',
            'allotment_class_id',
            'appropriation_source',
            'appropriation_type_id',
            'project_type_id',
            'program_classification',
            'program_id',
            'subprogram_id',
            'remarks',
            'appropriation_id',
        ]);
    }
}
