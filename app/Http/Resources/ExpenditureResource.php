<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Expenditure;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Expenditure $resource
 */
class ExpenditureResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      allotment_class_id: int,
     *      allotment_class_name?: string,
     *      code: string,
     *      id: int,
     *      name: string,
     *      obligations_count?: int,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'code' => $this->resource->code,
            'allotment_class_id' => $this->resource->allotment_class_id,
            'allotment_class_name' => $this->resource->allotment_class_name,
            'obligations_count' => $this->resource->obligations_count,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
