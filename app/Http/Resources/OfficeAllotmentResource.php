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
     * @return array{
     *      allocation_id: int,
     *      amount: string,
     *      id: int,
     *      obligations_count?: int,
     *      section_acronym?: string,
     *      section_id: int,
     *      section_name?: string,
     *      wfp_code?: string,
     *      wfp_prefix_code?: string,
     *      wfp_suffix_code: string,
     * }
     */
    public function toArray(Request $request): array
    {
        return array_filter([
            'allocation_id' => $this->resource->allocation_id,
            'amount' => $this->resource->amount,
            'id' => $this->resource->id,
            'obligations_count' => $this->resource->obligations_count,
            'section_id' => $this->resource->section_id,
            'section_name' => $this->resource->section_name,
            'section_acronym' => $this->resource->section_acronym,
            'wfp_code' => $this->resource->wfp_code,
            'wfp_prefix_code' => $this->resource->wfp_prefix_code,
            'wfp_suffix_code' => $this->resource->wfp_suffix_code,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
