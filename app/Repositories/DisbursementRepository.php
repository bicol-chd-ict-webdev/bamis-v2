<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\DisbursementInterface;
use App\Models\Disbursement;
use Illuminate\Database\Eloquent\Collection;

final class DisbursementRepository implements DisbursementInterface
{
    public function create(array $attributes): Disbursement
    {
        return Disbursement::query()->create($attributes);
    }

    public function update(Disbursement $disbursement, array $attributes): void
    {
        $disbursement->update($attributes);
    }

    public function delete(Disbursement $disbursement): void
    {
        $disbursement->delete();
    }

    public function list(?int $obligationId = null): Collection
    {
        return Disbursement::withoutTrashed()
            ->where('obligation_id', $obligationId)
            ->latest()
            ->get([
                'id',
                'net_amount',
                'date',
                'obligation_id',
                'check_date',
                'check_number',
                'tax',
                'retention',
                'penalty',
                'absences',
                'other_deductions',
                'remarks',
            ]);
    }
}
