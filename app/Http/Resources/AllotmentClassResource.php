<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\AllotmentClass;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property AllotmentClass $resource
 */
class AllotmentClassResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      acronym: string,
     *      allocations_count?: int,
     *      expenditures_count?: int,
     *      code?: string,
     *      id: int,
     *      name: string,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'acronym' => (string) $this->resource->acronym,
            'allocations_count' => (int) $this->resource->allocations_count,
            'expenditures_count' => (int) $this->resource->expenditures_count,
            'code' => $this->resource->code ? (string) $this->resource->code : null,
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
        ], fn ($value): bool => $value !== null);
    }
}
