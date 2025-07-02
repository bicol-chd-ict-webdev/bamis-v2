<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Subprogram;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Subprogram $resource
 */
class SubprogramResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *     id: int,
     *     name: string,
     *     program_id: int,
     *     program_name: string,
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'program_id' => (int) $this->resource->program_id,
            'program_name' => (string) $this->resource->program_name,
        ];
    }
}
