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
     *      program_classification: string
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'appropriation_source' => (string) $this->resource->appropriation_source,
            'code' => (string) $this->resource->code,
            'program_classification' => (string) $this->resource->program_classification,
        ];
    }
}
