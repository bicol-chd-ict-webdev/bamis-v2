<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Obligation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Obligation $resource
 */
class ObligationResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      allocation_id: int,
     *      amount: string,
     *      balance: string,
     *      creditor: string,
     *      date: string,
     *      disbursements_sum_amount?: mixed,
     *      dtrak_number?: string,
     *      id: int,
     *      is_transferred?: bool,
     *      expenditure_id?: mixed,
     *      expenditure_name?: mixed,
     *      norsa_type?: string,
     *      object_distribution_id: int,
     *      office?: mixed,
     *      office_allotment_id: int,
     *      oras_number: string,
     *      oras_number_reference: string,
     *      particulars: string,
     *      recipient?: string,
     *      reference_number?: string,
     *      series: string,
     *      tagged_obligation_id?: int,
     *      uacs_code?: mixed,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'allocation_id' => $this->resource->allocation_id,
            'amount' => $this->resource->amount,
            'balance' => $this->resource->balance,
            'creditor' => $this->resource->creditor,
            'date' => $this->resource->date,
            'disbursements_sum_amount' => $this->whenLoaded(
                'disbursements',
                fn () => $this->resource->disbursements_sum_amount
            ),
            'dtrak_number' => $this->resource->dtrak_number,
            'expenditure_id' => $this->whenLoaded(
                'objectDistribution',
                fn () => $this->resource->objectDistribution?->expenditure?->id
            ),
            'expenditure_name' => $this->whenLoaded(
                'objectDistribution',
                fn () => $this->resource->objectDistribution?->expenditure?->name
            ),
            'id' => $this->resource->id,
            'is_transferred' => $this->resource->is_transferred,
            'norsa_type' => $this->resource->norsa_type,
            'object_distribution_id' => $this->resource->object_distribution_id,
            'office' => $this->whenLoaded(
                'officeAllotment',
                fn () => $this->resource->officeAllotment?->section?->acronym
            ),
            'office_allotment_id' => $this->resource->office_allotment_id,
            'oras_number' => $this->resource->oras_number,
            'oras_number_reference' => $this->resource->oras_number_reference,
            'particulars' => $this->resource->particulars,
            'recipient' => $this->resource->recipient?->value,
            'reference_number' => $this->resource->reference_number,
            'series' => $this->resource->series,
            'tagged_obligation_id' => $this->resource->tagged_obligation_id,
            'uacs_code' => $this->whenLoaded(
                'objectDistribution',
                fn () => $this->resource->objectDistribution?->expenditure?->code
            ),
            'related_obligation' => $this->whenLoaded(
                'relatedObligation',
                fn (): ObligationResource => new ObligationResource($this->resource->relatedObligation)
            ),
            'tagged_obligations' => $this->whenLoaded(
                'taggedObligations',
                fn () => ObligationResource::collection($this->resource->taggedObligations)
            ),
        ], fn ($value): bool => $value !== null);
    }
}
