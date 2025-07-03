<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\AppropriationType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property AppropriationType $resource
 */
class AppropriationTypeResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *     acronym?: string,
     *     allocations_count?: int,
     *     code?: string,
     *     id: int,
     *     name: string,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'acronym' => $this->resource->acronym ? (string) $this->resource->acronym : null,
            'allocations_count' => $this->resource->allocations_count,
            'code' => $this->resource->code ? (string) $this->resource->code : null,
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
        ], fn ($value): bool => $value !== null);
    }
}
