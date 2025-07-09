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
     *      allocation_id: string,
     *      amount: string,
     *      creditor: string,
     *      date: string,
     *      dtrak_number: number,
     *      id: int,
     *      is_batch_process?: bool,
     *      is_transferred?: bool,
     *      norsa_type?: string,
     *      object_distribution_id: string,
     *      office_allotment_id: string,
     *      office: string,
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
            'allocation_id' => (string) $this->resource->allocation_id,
            'amount' => (string) $this->resource->amount,
            'creditor' => (string) $this->resource->creditor,
            'date' => (string) $this->resource->date,
            'dtrak_number' => (int) $this->resource->dtrak_number,
            'id' => (int) $this->resource->id,
            'is_batch_process' => (bool) $this->resource->is_batch_process,
            'is_transferred' => (bool) $this->resource->is_transferred,
            'norsa_type' => (string) $this->resource->norsa_type,
            'object_distribution_id' => (string) $this->resource->object_distribution_id,
            'office_allotment_id' => (string) $this->resource->office_allotment_id,
            'office' => (string) $this->resource->officeAllotment->section->acronym,
            'particulars' => (string) $this->resource->particulars,
            'recipient' => (string) $this->resource->recipient?->value,
            'reference_number' => (string) $this->resource->reference_number,
            'series' => (string) $this->resource->series,
            'uacs_code' => (string) $this->resource->objectDistribution->expenditure->code,
        ], fn ($value): bool => $value !== null);
    }
}
