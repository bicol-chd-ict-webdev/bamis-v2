<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Allocation;

use App\Enums\AppropriationSource;
use App\Enums\ProgramClassification;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateAllocationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        return $user && $user->hasRole('Budget');
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|\Illuminate\Validation\ConditionalRules|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appropriation_id' => ['required', 'integer'],
            'appropriation_source' => ['required', 'string', Rule::enum(AppropriationSource::class)],
            'appropriation_type_id' => ['required', 'integer'],
            'project_type_id' => ['nullable', Rule::requiredIf($this->input('appropriation_source') === AppropriationSource::NEW->value)],
            'allotment_class_id' => ['required', 'integer'],
            'line_item_id' => ['required', 'integer'],
            'program_classification' => [Rule::requiredIf($this->input('project_type_id') === '3'), Rule::when((bool) $this->input('program_classification'), ['string', Rule::enum(ProgramClassification::class)], 'nullable')],
            'program_id' => ['nullable', 'integer'],
            'subprogram_id' => ['nullable', 'integer'],
            'amount' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'],
            'date_received' => ['required', Rule::date()->format('Y-m-d')],
            'remarks' => Rule::when((bool) $this->input('remarks'), ['string', 'min:3', 'max:255', 'regex:/^[a-zA-Z0-9 ]+$/'], ['nullable']),
        ];
    }

    /**
     * @return array<string, string|array<string, string>>
     */
    public function messages(): array
    {
        return [
            'appropriation_id.required' => 'The appropriation field is required.',
            'appropriation_id.integer' => 'The appropriation field must be an integer.',
            'appropriation_type_id.required' => 'The appropriation type field is required.',
            'appropriation_type_id.integer' => 'The appropriation type field must be an integer.',
            'project_type_id.required' => 'The project type field is required.',
            'project_type_id.integer' => 'The project type field must be an integer.',
            'allotment_class_id.required' => 'The allotment class field is required.',
            'allotment_class_id.integer' => 'The allotment class field must be an integer.',
            'line_item_id.required' => 'The line item field is required.',
            'line_item_id.integer' => 'The line item field must be an integer.',
            'program_id.required' => 'The program field is required.',
            'program_id.integer' => 'The program field must be an integer.',
            'subprogram_id.required' => 'The subprogram field is required.',
            'subprogram_id.integer' => 'The subprogram field must be an integer.',
        ];
    }
}
