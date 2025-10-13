<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property User $resource
 */
final class AccountResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *     id: int,
     *     name: string,
     *     email: string,
     *     designation: string,
     *     status: string,
     *     role: string,
     * }
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'email' => $this->resource->email,
            'designation' => $this->resource->designation,
            'status' => $this->resource->status->value,
            'role' => $this->resource->role,
        ];
    }
}
