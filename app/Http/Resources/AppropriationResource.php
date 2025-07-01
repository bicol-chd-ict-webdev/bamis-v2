<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Appropriation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Appropriation $resource
 */
class AppropriationResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *     acronym?: string,
     *     id: int,
     *     name: string,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'acronym' => $this->resource->acronym ? (string) $this->resource->acronym : null,
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
        ], fn ($value): bool => $value !== null);
    }
}
