<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ObligationInterface;
use App\Models\Obligation;
use App\Services\SeriesGeneratorService;
use Illuminate\Database\Eloquent\Collection;

class ObligationRepository implements ObligationInterface
{
    public function __construct(protected SeriesGeneratorService $seriesGenerator) {}

    public function create(array $attributes): Obligation
    {
        $attributes['series'] = $this->seriesGenerator->generate($attributes);

        return Obligation::create($attributes);
    }

    public function update(Obligation $obligation, array $attributes): void
    {
        $obligation->update($attributes);
    }

    public function delete(Obligation $obligation): void
    {
        $obligation->delete();
    }

    public function list(?int $allocationId = null): Collection
    {
        return Obligation::withoutTrashed()
            ->where('allocation_id', $allocationId)
            ->latest()
            ->get([
                'id',
                'date',
                'creditor',
                'particulars',
                'amount',
                'allocation_id',
                'object_distribution_id',
                'office_allotment_id',
                'is_batch_process',
                'recipient',
                'is_transferred',
                'norsa_type',
                'series',
                'dtrak_number',
                'reference_number',
            ]);
    }
}
