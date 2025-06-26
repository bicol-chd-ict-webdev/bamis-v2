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
     *     id: int,
     *     name: string,
     *     acronym: string,
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'acronym' => (string) $this->resource->acronym,
        ];
    }
}
