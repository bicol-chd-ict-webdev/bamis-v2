<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\DueInterface;
use App\Models\Due;
use Illuminate\Support\Collection;

class DueRepository implements DueInterface
{
    public function create(array $attributes): Due
    {
        return Due::create($attributes);
    }

    public function update(Due $due, array $attributes): void
    {
        $due->update($attributes);
    }

    public function delete(Due $due): void
    {
        $due->delete();
    }

    public function list(?int $obligationId = null): Collection
    {
        return Due::withoutTrashed()
            ->where('obligation_id', $obligationId)
            ->latest()
            ->get(['id', 'amount', 'obligation_id']);
    }
}
