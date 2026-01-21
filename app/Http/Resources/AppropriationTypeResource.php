<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\AppropriationType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property AppropriationType $resource
 */
final class AppropriationTypeResource extends JsonResource
{
    /**
     * @return array{
     *     acronym: string,
     *     allocations_count?: int,
     *     code: string,
     *     id: int,
     *     name: string,
     * }
     */
    public function toArray(Request $request): array
    {
        return array_filter([
            'acronym' => (string) $this->resource->acronym,
            'allocations_count' => (int) $this->resource->allocations_count,
            'code' => (string) $this->resource->code,
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
