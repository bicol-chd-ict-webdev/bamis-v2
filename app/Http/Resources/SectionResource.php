<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Section $resource
 */
final class SectionResource extends JsonResource
{
    /**
     * @return array{
     *     id: int,
     *     name: string,
     *     acronym: string,
     *     code: string,
     *     division_id: int,
     *     division_name: string|null
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'acronym' => (string) $this->resource->acronym,
            'code' => (string) $this->resource->code,
            'division_id' => (int) $this->resource->division_id,
            'division_name' => (string) $this->resource->division_name,
        ];
    }
}
