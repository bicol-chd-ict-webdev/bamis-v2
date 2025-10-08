<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\ObligationInterface;
use App\Models\Obligation;
use App\Services\Obligation\OrasGeneratorService;
use Illuminate\Database\Eloquent\Collection;

class ObligationRepository implements ObligationInterface
{
    public function __construct(
        protected OrasGeneratorService $orasGeneratorService,
    ) {}

    /**
     * @param  array{
     *     offices: array<int, array{
     *         office_allotment_id: int,
     *         section_id?: int|null,
     *         amount: numeric-string|float|int
     *     }>,
     *     oras_number?: string,
     *     allocation_id?: int,
     *     series?: string,
     *     creditor?: string,
     *     particulars?: string,
     *     recipient?: string|null,
     *     norsa_type?: string|null,
     *     is_cancelled?: bool|null,
     *     is_transferred?: bool|null,
     *     dtrak_number?: string|null,
     *     reference_number?: string|null,
     *     tagged_obligation_id?: int|null
     * } $attributes
     * @return array<int, Obligation>
     */
    public function create(array $attributes): array
    {
        $created = [];

        $orasNumber = $this->orasGeneratorService->generate($attributes);

        foreach ($attributes['offices'] as $office) {
            $data = $attributes;

            $data['office_allotment_id'] = $office['office_allotment_id'];
            $data['amount'] = $office['amount'];
            $data['oras_number'] = $orasNumber;

            unset($data['offices']);

            $created[] = Obligation::create($data);
        }

        return $created;
    }

    /**
     * @param  array{
     *     offices?: array<int, array{
     *         office_allotment_id: int,
     *         section_id?: int|null,
     *         amount: numeric-string|float|int
     *     }>
     * }  $attributes
     */
    public function update(Obligation $obligation, array $attributes): void
    {
        $attributes['oras_number'] = $this->orasGeneratorService->generate($attributes);

        if (! empty($attributes['offices'][0])) {
            /** @var array{office_allotment_id:int,section_id?:int|null,amount:numeric-string|float|int} $office */
            $office = $attributes['offices'][0];
            $attributes['office_allotment_id'] = $office['office_allotment_id'];
            $attributes['section_id'] = $office['section_id'] ?? null;
            $attributes['amount'] = $office['amount'];
        }

        unset($attributes['offices']);

        $obligation->update($attributes);
    }

    public function delete(Obligation $obligation): void
    {
        $obligation->delete();
    }

    /**
     * @return Collection<int, Obligation>
     */
    public function list(?int $allocationId = null): Collection
    {
        return Obligation::withoutTrashed()
            ->select([
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
                'is_cancelled',
                'is_transferred',
                'norsa_type',
                'series',
                'dtrak_number',
                'reference_number',
                'tagged_obligation_id',
            ])
            ->with([
                'officeAllotment:id,section_id,allocation_id,amount',
                'officeAllotment.section:id,name,acronym,code',
                'objectDistribution:id,expenditure_id,allocation_id,amount',
                'objectDistribution.expenditure:id,name,code',
                'relatedObligation:id,oras_number,series',
                'taggedObligations:id,oras_number,series',
                'disbursements:id,obligation_id,net_amount,tax,retention,penalty,absences,other_deductions',
            ])
            ->when($allocationId, fn ($q) => $q->where('allocation_id', $allocationId))
            ->latest()
            ->get();
    }

    public function cancel(Obligation $obligation): void
    {
        $obligation->update([
            'is_cancelled' => true,
            'amount' => 0,
            'particulars' => 'CANCELLED',
            'creditor' => 'CANCELLED',
        ]);
    }
}
