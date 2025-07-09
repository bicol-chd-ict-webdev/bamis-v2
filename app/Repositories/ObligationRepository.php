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
        assert(isset($attributes['allocation_id']) && is_int($attributes['allocation_id']));
        assert(isset($attributes['date']) && is_string($attributes['date']));

        $seriesAttributes = [
            'allocation_id' => $attributes['allocation_id'],
            'date' => $attributes['date'],
            'is_batch_process' => isset($attributes['is_batch_process']) && (bool) $attributes['is_batch_process'],
        ];

        $attributes['series'] = $this->seriesGenerator->generate($seriesAttributes);

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
