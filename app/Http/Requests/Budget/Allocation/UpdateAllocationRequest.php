<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Allocation;

use App\Enums\AppropriationSourceEnum;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ConditionalRules;
use Illuminate\Validation\Rule;

final class UpdateAllocationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var User|null $user */
        $user = Auth::user();

        return $user && $user->hasRole('Budget');
    }

    /**
     * @return array<string, ValidationRule|ConditionalRules|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appropriation_id' => ['required', 'integer'],
            'appropriation_source' => ['required', 'string', Rule::enum(AppropriationSourceEnum::class)],
            'appropriation_type_id' => ['required', 'integer', Rule::notIn([0])],
            'project_type_id' => Rule::when(
                $this->input('appropriation_source') === AppropriationSourceEnum::NEW->value,
                ['required', 'integer', Rule::notIn([0])],
                ['nullable']
            ),
            'allotment_class_id' => ['required', 'integer', Rule::notIn([0])],
            'line_item_id' => ['required', 'integer', Rule::notIn([0])],
            'program_classification_id' => Rule::when(
                $this->integer('project_type_id') === 3,
                ['required', 'integer', Rule::notIn([0])],
                ['nullable'],
            ),
            'program_id' => Rule::when(
                $this->integer('project_type_id') === 3,
                ['required', 'integer', Rule::notIn([0])],
                ['nullable'],
            ),
            'subprogram_id' => ['nullable', 'integer'],
            'amount' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'],
            'date_received' => ['required', Rule::date()->format('Y-m-d')],
            'remarks' => Rule::when((bool) $this->input('remarks'), ['string', 'min:3', 'max:100'], ['nullable']),
            'particulars' => Rule::when((bool) $this->input('particulars'), ['string', 'min:3', 'max:255'], ['nullable']),
            'saa_number' => Rule::when((bool) $this->input('saa_number'), ['string', 'min:9', 'max:15', 'regex:/^[0-9\-]+$/'], ['nullable']),
            'department_order' => Rule::when((bool) $this->input('department_order'), ['string', 'min:5', 'max:10', 'regex:/^[0-9\-]+$/'], ['nullable']),
            'saro_number' => Rule::when((bool) $this->input('saro_number'), ['string', 'min:3', 'max:10', 'regex:/^[0-9\-]+$/'], ['nullable']),
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
            'appropriation_type_id.not_in' => 'The appropriation type field is required.',
            'project_type_id.required' => 'The project type field is required.',
            'project_type_id.integer' => 'The project type field must be an integer.',
            'project_type_id.not_in' => 'The project type field is required.',
            'allotment_class_id.required' => 'The allotment class field is required.',
            'allotment_class_id.integer' => 'The allotment class field must be an integer.',
            'allotment_class_id.not_in' => 'The allotment class field is required.',
            'line_item_id.required' => 'The line item field is required.',
            'line_item_id.integer' => 'The line item field must be an integer.',
            'line_item_id.not_in' => 'The line item field is required.',
            'program_id.required' => 'The program field is required.',
            'program_id.integer' => 'The program field must be an integer.',
            'program_id.not_in' => 'The program field is required.',
            'subprogram_id.required' => 'The subprogram field is required.',
            'subprogram_id.integer' => 'The subprogram field must be an integer.',
            'subprogram_id.not_in' => 'The subprogram field is required.',
            'program_classification_id.required' => 'The program classification field is required.',
            'program_classification_id.integer' => 'The program classification field must be an integer.',
            'program_classification_id.not_in' => 'The program classification field is required.',
        ];
    }
}
