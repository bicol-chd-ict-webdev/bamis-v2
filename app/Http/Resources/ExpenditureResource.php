<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Expenditure;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Expenditure $resource
 */
final class ExpenditureResource extends JsonResource
{
    /**
     * @return array{
     *      allotment_class_id: int,
     *      allotment_class_name?: string,
     *      code: string,
     *      id: int,
     *      name: string,
     *      obligations_count?: int,
     * }
     */
    public function toArray(Request $request): array
    {
        return array_filter([
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
            'code' => (string) $this->resource->code,
            'allotment_class_id' => (int) $this->resource->allotment_class_id,
            'allotment_class_name' => (string) $this->resource->allotment_class_name,
            'obligations_count' => (int) $this->resource->obligations_count,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
