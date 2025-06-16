<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Division $resource
 */
class DivisionResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      acronym: string,
     *      id: number,
     *      name: string,
     *      sections_count: number | null
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'acronym' => $this->resource->acronym,
            'sections_count' => $this->resource->sections_count,
        ];
    }
}
