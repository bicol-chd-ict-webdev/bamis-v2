<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\ProgramClassification;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property ProgramClassification $resource
 */
final class ProgramClassificationResource extends JsonResource
{
    /**
     * @return array{
     *      code: string,
     *      id: int,
     *      name: string,
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'code' => (string) $this->resource->code,
            'id' => (int) $this->resource->id,
            'name' => (string) $this->resource->name,
        ];
    }
}
