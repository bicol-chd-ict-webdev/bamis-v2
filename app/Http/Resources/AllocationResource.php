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
     *      allotment_class_id: int,
     *      allotment_class_name?: string,
     *      allotment_class_acronym?: string,
     *      amount: string,
     *      appropriation_id: int,
     *      appropriation_name?: string,
     *      appropriation_source: string,
     *      appropriation_type_id: int,
     *      appropriation_type_name?: string,
     *      date_received: string,
     *      department_order?: string,
     *      disbursements_sum_amount?: string,
     *      id: int,
     *      line_item_id: int,
     *      line_item_name?: string,
     *      object_distributions_count?: int,
     *      obligations_sum_amount?: string,
     *      office_allotments_count?: int,
     *      particulars?: string,
     *      program_classification_id?: int,
     *      program_classification_name?: string,
     *      program_id?: int,
     *      program_name?: string,
     *      project_type_id?: int,
     *      remarks?: string,
     *      saa_number?: string,
     *      saro_number?: string,
     *      subprogram_id?: int,
     *      subprogram_name?: string,
     *      unobligated_balance?: string,
     * }
     */
    public function toArray($request): array
    {
        return array_filter([
            'allotment_class_id' => $this->resource->allotment_class_id,
            'allotment_class_name' => $this->resource->allotment_class_name,
            'allotment_class_acronym' => $this->resource->allotment_class_acronym,
            'amount' => $this->resource->amount,
            'appropriation_id' => $this->resource->appropriation_id,
            'appropriation_name' => $this->resource->appropriation_name,
            'appropriation_source' => $this->resource->appropriation_source->value,
            'appropriation_type_id' => $this->resource->appropriation_type_id,
            'appropriation_type_name' => $this->resource->appropriation_type_name,
            'date_received' => $this->resource->date_received,
            'department_order' => $this->resource->department_order,
            'id' => $this->resource->id,
            'line_item_id' => $this->resource->line_item_id,
            'line_item_name' => $this->resource->line_item_name,
            'particulars' => $this->resource->particulars,
            'program_classification_id' => $this->resource->program_classification_id,
            'program_classification_name' => $this->resource->program_classification_name,
            'program_id' => $this->resource->program_id,
            'program_name' => $this->resource->program_name,
            'project_type_id' => $this->resource->project_type_id,
            'remarks' => $this->resource->remarks,
            'saa_number' => $this->resource->saa_number,
            'saro_number' => $this->resource->saro_number,
            'subprogram_id' => $this->resource->subprogram_id,
            'subprogram_name' => $this->resource->subprogram_name,
            'object_distributions_count' => $this->resource->object_distributions_count,
            'obligations_sum_amount' => $this->resource->obligations_sum_amount,
            'office_allotments_count' => $this->resource->office_allotments_count,
            'disbursements_sum_amount' => $this->resource->disbursements_sum_amount,
            'unobligated_balance' => $this->resource->unobligated_balance,
        ], fn (string|int|null $value): bool => $value !== null);
    }
}
