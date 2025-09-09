<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Program $resource
 */
class ProgramResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      appropriation_source: string,
     *      code: string,
     *      id: int,
     *      name: string,
     *      program_classification_id?: int,
     *      program_classification_name?: string
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'appropriation_source' => $this->resource->appropriation_source,
            'code' => $this->resource->code,
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'program_classification_id' => $this->resource->program_classification_id,
            'program_classification_name' => $this->resource->program_classification_name,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
