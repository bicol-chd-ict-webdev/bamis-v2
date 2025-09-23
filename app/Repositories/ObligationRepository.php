<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ObligationInterface;
use App\Models\Obligation;
use App\Services\Obligation\OrasGeneratorService;
use Illuminate\Database\Eloquent\Collection;

class ObligationRepository implements ObligationInterface
{
    public function __construct(protected OrasGeneratorService $orasGeneratorService) {}

    public function create(array $attributes): Obligation
    {
        $attributes['oras_number'] = $this->orasGeneratorService->generate($attributes);

        return Obligation::create($attributes);
    }

    public function update(Obligation $obligation, array $attributes): void
    {
        $attributes['oras_number'] = $this->orasGeneratorService->generate($attributes);

        $obligation->update($attributes);
    }

    public function delete(Obligation $obligation): void
    {
        $obligation->delete();
    }

    public function list(?int $allocationId = null): Collection
    {
        return Obligation::withoutTrashed()
            ->with([
                'disbursements',
                'officeAllotment',
                'objectDistribution',
                'relatedObligation',     // eager load parent
                'taggedObligations',     // eager load children
            ])
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
                'oras_number',
                'recipient',
                'is_transferred',
                'norsa_type',
                'series',
                'dtrak_number',
                'reference_number',
                'tagged_obligation_id',
            ]);
    }
}
