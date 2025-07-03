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
     *      allocation_id: string,
     *      amount: string,
     *      expenditure_id: string,
     *      expenditure_name?: string,
     *      id: int
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'allocation_id' => (string) $this->resource->allocation_id,
            'amount' => (string) $this->resource->amount,
            'expenditure_id' => (string) $this->resource->expenditure_id,
            'expenditure_name' => $this->resource->expenditure_name !== null
                ? (string) $this->resource->expenditure_name
                : null,
            'id' => (int) $this->resource->id,
        ], fn ($value): bool => $value !== null);
    }
}
