<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Disbursement;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Disbursement $resource
 */
final class DisbursementResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      absences?: string,
     *      check_date?: string,
     *      check_number?: string,
     *      date: string,
     *      id: int,
     *      net_amount: string,
     *      obligation_id: int,
     *      other_deductions?: string,
     *      penalty?: string,
     *      remarks?: string,
     *      retention?: string,
     *      tax?: string,
     *      total_amount?: string,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'absences' => $this->resource->absences,
            'check_date' => $this->resource->check_date,
            'check_number' => $this->resource->check_number,
            'date' => $this->resource->date,
            'id' => $this->resource->id,
            'net_amount' => $this->resource->net_amount,
            'obligation_id' => $this->resource->obligation_id,
            'other_deductions' => $this->resource->other_deductions,
            'penalty' => $this->resource->penalty,
            'remarks' => $this->resource->remarks,
            'retention' => $this->resource->retention,
            'tax' => $this->resource->tax,
            'total_amount' => $this->resource->total_amount,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
