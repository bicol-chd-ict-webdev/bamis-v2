<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Allocation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Allocation $resource
 */
class AllocationResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array{
     *      allotment_class_id: string,
     *      allotment_class_name: string,
     *      amount: int,
     *      appropriation_id: string,
     *      appropriation_source: string,
     *      appropriation_type_id: string,
     *      date_received: string,
     *      id: int,
     *      line_item_id: string,
     *      line_item_name: string,
     *      project_type_id?: string,
     *      program_classification?: string,
     *      program_id?: string,
     *      remarks?: string,
     *      subprogram_id?: string
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'allotment_class_id' => (string) $this->resource->allotment_class_id,
            'allotment_class_name' => (string) $this->resource->allotment_class_name,
            'amount' => (int) $this->resource->amount,
            'appropriation_id' => (string) $this->resource->appropriation_id,
            'appropriation_source' => $this->resource->appropriation_source->value,
            'appropriation_type_id' => (string) $this->resource->appropriation_type_id,
            'date_received' => (string) $this->resource->date_received,
            'id' => (int) $this->resource->id,
            'line_item_id' => (string) $this->resource->line_item_id,
            'line_item_name' => (string) $this->resource->line_item_name,
            'project_type_id' => (string) $this->resource->project_type_id,
            'program_classification' => $this->resource->program_classification?->value,
            'program_id' => (string) $this->resource->program_id,
            'remarks' => (string) $this->resource->remarks,
            'subprogram_id' => (string) $this->resource->subprogram_id,
        ], fn ($value): bool => $value !== null);
    }
}
