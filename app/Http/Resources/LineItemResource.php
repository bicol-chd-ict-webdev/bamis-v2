<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\LineItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property LineItem $resource
 */
class LineItemResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      acronym: string,
     *      code: string,
     *      id: int,
     *      name: string
     * }
     */
    public function toArray($request): array
    {
        return [
            'acronym' => $this->resource->acronym,
            'code' => $this->resource->code,
            'id' => $this->resource->id,
            'name' => $this->resource->name,
        ];
    }
}
