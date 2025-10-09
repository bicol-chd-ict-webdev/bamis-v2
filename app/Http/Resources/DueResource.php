<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Due;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Due $resource
 */
class DueResource extends JsonResource
{
    /**
     * @return array{
     *      amount: string,
     *      id: int,
     *      obligation_id: int,
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'amount' => $this->resource->amount,
            'id' => $this->resource->id,
            'obligation_id' => $this->resource->obligation_id,
        ];
    }
}
