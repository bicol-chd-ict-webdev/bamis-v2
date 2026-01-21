<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Program $resource
 */
final class ProgramResource extends JsonResource
{
    /**
     * @return array{
     *      appropriation_source: string,
     *      code: string,
     *      id: int,
     *      name: string,
     *      program_classification_id?: int,
     *      program_classification_name?: string
     * }
     */
    public function toArray(Request $request): array
    {
        return array_filter([
            'appropriation_source' => (string) $this->resource->appropriation_source,
            'code' => (string) $this->resource->code,
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'program_classification_id' => (int) $this->resource->program_classification_id,
            'program_classification_name' => (string) $this->resource->program_classification_name,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
