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
     *      dtrak_number: string,
     *      id: int,
     *      is_batch_process?: bool,
     *      is_transferred?: bool,
     *      norsa_type?: string,
     *      object_distribution_id: int,
     *      office_allotment_id: int,
     *      office?: string,
     *      particulars: string,
     *      recipient?: string,
     *      reference_number: string,
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
            'dtrak_number' => $this->resource->dtrak_number,
            'id' => $this->resource->id,
            'is_batch_process' => $this->resource->is_batch_process,
            'is_transferred' => $this->resource->is_transferred,
            'norsa_type' => $this->resource->norsa_type,
            'object_distribution_id' => $this->resource->object_distribution_id,
            'office_allotment_id' => $this->resource->office_allotment_id,
            'office' => $this->resource->officeAllotment?->section?->acronym,
            'particulars' => $this->resource->particulars,
            'recipient' => $this->resource->recipient?->value,
            'reference_number' => $this->resource->reference_number,
            'series' => $this->resource->series,
            'uacs_code' => $this->resource->objectDistribution?->expenditure?->code,
        ], fn ($value): bool => $value !== null);
    }
}
