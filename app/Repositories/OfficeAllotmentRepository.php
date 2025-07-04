<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\OfficeAllotmentInterface;
use App\Models\OfficeAllotment;
use Illuminate\Database\Eloquent\Collection;

class OfficeAllotmentRepository implements OfficeAllotmentInterface
{
    public function create(array $attributes): OfficeAllotment
    {
        return OfficeAllotment::create($attributes);
    }

    public function update(OfficeAllotment $officeAllotment, array $attributes): void
    {
        $officeAllotment->update($attributes);
    }

    public function delete(OfficeAllotment $officeAllotment): void
    {
        $officeAllotment->delete();
    }

    public function list(?int $allocationId = null): Collection
    {
        return OfficeAllotment::withoutTrashed()
            ->where('allocation_id', $allocationId)
            ->latest()
            ->get(['id', 'allocation_id', 'section_id', 'amount']);
    }
}
