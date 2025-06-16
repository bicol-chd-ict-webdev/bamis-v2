<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Section $resource
 */
class SectionResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *     id: int,
     *     name: string,
     *     acronym: string,
     *     code: string,
     *     division_id: int|float,
     *     division_name: string|null
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'acronym' => $this->resource->acronym,
            'code' => $this->resource->code,
            'division_id' => $this->resource->division_id,
            'division_name' => $this->resource->division_name,
        ];
    }
}
