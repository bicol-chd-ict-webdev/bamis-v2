<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\AllotmentClass;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property AllotmentClass $resource
 */
class AllotmentClassResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      acronym: string,
     *      code: string,
     *      id: number,
     *      name: string,
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'acronym' => $this->resource->acronym,
            'code' => $this->resource->code,
        ];
    }
}
