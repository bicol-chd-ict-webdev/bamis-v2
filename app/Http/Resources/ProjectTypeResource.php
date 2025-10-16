<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\ProjectType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property ProjectType $resource
 */
final class ProjectTypeResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      code: string,
     *      id: number,
     *      name: string,
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'code' => (string) $this->resource->code,
        ];
    }
}
