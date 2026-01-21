<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Appropriation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Appropriation $resource
 */
final class AppropriationResource extends JsonResource
{
    /**
     * @return array{
     *     acronym: string,
     *     id: int,
     *     name: string,
     * }
     */
    public function toArray(Request $request): array
    {
        return array_filter([
            'acronym' => (string) $this->resource->acronym,
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
        ], fn (int|string|null $value): bool => $value !== null);
    }
}
