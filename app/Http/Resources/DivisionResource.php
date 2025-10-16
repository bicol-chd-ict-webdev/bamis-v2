<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Division $resource
 */
final class DivisionResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      acronym: string,
     *      id: int,
     *      name: string,
     *      sections_count: int | null
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'acronym' => (string) $this->resource->acronym,
            'sections_count' => (int) $this->resource->sections_count,
        ];
    }
}
