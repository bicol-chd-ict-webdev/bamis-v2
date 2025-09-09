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
     *      code: string,
     *      id: int,
     *      name: string,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'acronym' => $this->resource->acronym,
            'allocations_count' => $this->resource->allocations_count,
            'expenditures_count' => $this->resource->expenditures_count,
            'code' => $this->resource->code,
            'id' => $this->resource->id,
            'name' => $this->resource->name,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
