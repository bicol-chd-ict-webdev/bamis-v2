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
     *      creditor: string,
     *      date: string,
     *      disbursements_sum_amount?: string,
     *      dtrak_number?: string,
     *      id: int,
     *      is_transferred?: bool,
     *      norsa_type?: string,
     *      object_distribution_id: int,
     *      office?: string,
     *      office_allotment_id: int,
     *      oras_number: string,
     *      oras_number_reference: string,
     *      particulars: string,
     *      recipient?: string,
     *      reference_number?: string,
     *      series: string,
     *      uacs_code?: string,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'allocation_id' => $this->resource->allocation_id,
            'amount' => $this->resource->amount,
            'creditor' => $this->resource->creditor,
            'date' => $this->resource->date,
            'disbursements_sum_amount' => $this->resource->disbursements_sum_amount,
            'dtrak_number' => $this->resource->dtrak_number,
            'id' => $this->resource->id,
            'is_transferred' => $this->resource->is_transferred,
            'norsa_type' => $this->resource->norsa_type,
            'object_distribution_id' => $this->resource->object_distribution_id,
            'office' => $this->resource->officeAllotment?->section?->acronym,
            'office_allotment_id' => $this->resource->office_allotment_id,
            'oras_number' => $this->resource->oras_number,
            'oras_number_reference' => $this->resource->oras_number_reference,
            'particulars' => $this->resource->particulars,
            'recipient' => $this->resource->recipient?->value,
            'reference_number' => $this->resource->reference_number,
            'series' => $this->resource->series,
            'uacs_code' => $this->resource->objectDistribution?->expenditure?->code,
        ], fn ($value): bool => $value !== null);
    }
}
