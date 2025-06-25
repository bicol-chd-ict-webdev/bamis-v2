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
     *      expenditures_count: int,
     *      code: string,
     *      id: int,
     *      name: string,
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'acronym' => (string) $this->resource->acronym,
            'code' => (string) $this->resource->code,
            'expenditures_count' => (int) $this->resource->expenditures_count,
        ];
    }
}
