<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\ObjectDistribution;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property ObjectDistribution $resource
 */
class ObjectDistributionResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      allocation_id: int,
     *      amount: string,
     *      expenditure_id: int,
     *      expenditure_name?: string,
     *      id: int,
     *      obligations_count?: int,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'allocation_id' => $this->resource->allocation_id,
            'amount' => $this->resource->amount,
            'expenditure_id' => $this->resource->expenditure_id,
            'expenditure_name' => $this->resource->expenditure_name,
            'id' => $this->resource->id,
            'obligations_count' => $this->resource->obligations_count,
        ], fn ($value): bool => $value !== null);
    }
}
