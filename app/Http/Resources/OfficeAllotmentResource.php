<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\OfficeAllotment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property OfficeAllotment $resource
 */
class OfficeAllotmentResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      allocation_id: string,
     *      amount: string,
     *      id: int,
     *      section_id: string,
     *      section_name?: string
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'allocation_id' => (string) $this->resource->allocation_id,
            'amount' => (string) $this->resource->amount,
            'id' => (int) $this->resource->id,
            'section_id' => (string) $this->resource->section_id,
            'section_name' => $this->resource->section_name !== null
                ? (string) $this->resource->section_name
                : null,
        ], fn ($value): bool => $value !== null);
    }
}
