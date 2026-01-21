<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Program;

use App\Concerns\HasAuthenticatedUser;
use App\Enums\AppropriationSourceEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreProgramRequest extends FormRequest
{
    use HasAuthenticatedUser;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->authenticatedUser();

        return $user->hasRole('Budget');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'regex:/^[A-Za-z\s]+$/',
                Rule::unique('programs')
                    ->whereNull('deleted_at'),
            ],
            'code' => [
                'required',
                'numeric',
                'regex:/^\d{7,15}$/',
                Rule::unique('programs', 'code')
                    ->whereNull('deleted_at'),
            ],
            'appropriation_source' => [
                'required',
                'string',
                Rule::enum(AppropriationSourceEnum::class),
            ],
            'program_classification_id' => [
                'nullable',
                'integer',
                Rule::notIn([0]),
            ],
        ];
    }

    /**
     * Get the custom validation messages for the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'code.regex' => 'The :attribute field must be between 7 and 15 digits long.',
            'program_classification_id.not_in' => 'The program classification field is required.',
        ];
    }
}
