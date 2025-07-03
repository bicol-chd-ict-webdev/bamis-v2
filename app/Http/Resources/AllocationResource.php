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
     *     additional_code?: string,
     *     allotment_class_id: string,
     *     allotment_class_name: string,
     *     amount: string,
     *     appropriation_id: string,
     *     appropriation_name: string,
     *     appropriation_source: string,
     *     appropriation_type_id: string,
     *     appropriation_type_name: string,
     *     date_received: string,
     *     department_order?: string,
     *     id: int,
     *     line_item_id: string,
     *     line_item_name: string,
     *     particulars?: string,
     *     program_classification?: string,
     *     program_id?: string,
     *     project_type_id?: string,
     *     remarks?: string,
     *     saa_number?: string,
     *     saro_number?: string,
     *     subprogram_id?: string
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'additional_code' => (string) $this->resource->additional_code,
            'allotment_class_id' => (string) $this->resource->allotment_class_id,
            'allotment_class_name' => (string) $this->resource->allotment_class_name,
            'amount' => (string) $this->resource->amount,
            'appropriation_id' => (string) $this->resource->appropriation_id,
            'appropriation_name' => (string) $this->resource->appropriation_name,
            'appropriation_source' => $this->resource->appropriation_source->value,
            'appropriation_type_id' => (string) $this->resource->appropriation_type_id,
            'appropriation_type_name' => (string) $this->resource->appropriation_type_name,
            'date_received' => (string) $this->resource->date_received,
            'department_order' => (string) $this->resource->department_order,
            'id' => (int) $this->resource->id,
            'line_item_id' => (string) $this->resource->line_item_id,
            'line_item_name' => (string) $this->resource->line_item_name,
            'particulars' => (string) $this->resource->particulars,
            'program_classification' => $this->resource->program_classification?->value,
            'program_id' => (string) $this->resource->program_id,
            'program_name' => (string) $this->resource->program_name,
            'project_type_id' => (string) $this->resource->project_type_id,
            'remarks' => (string) $this->resource->remarks,
            'saa_number' => (string) $this->resource->saa_number,
            'saro_number' => (string) $this->resource->saro_number,
            'subprogram_id' => (string) $this->resource->subprogram_id,
            'subprogram_name' => (string) $this->resource->subprogram_name,
        ], fn ($value): bool => $value !== null);
    }
}
