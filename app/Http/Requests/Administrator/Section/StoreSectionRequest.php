<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\Section;

use App\Concerns\HasAuthenticatedUser;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreSectionRequest extends FormRequest
{
    use HasAuthenticatedUser;

    public function authorize(): bool
    {
        $user = $this->authenticatedUser();

        return $user->hasRole('Administrator');
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
                'max:100',
                'regex:/^[a-zA-Z,\-\/&\s]+$/',
                Rule::unique('sections')
                    ->ignore('section')
                    ->whereNull('deleted_at'),
            ],
            'acronym' => ['required', 'string', 'min:2', 'max:25', 'regex:/^[A-Z\/\- ]+$/'],
            'code' => ['required', 'string', 'max:10', 'regex:/^[a-zA-Z0-9\.]+$/'],
            'division_id' => ['required', 'integer'],
        ];
    }

    /**
     * @return array<string, string|array<string, string>>
     */
    public function messages(): array
    {
        return [
            'division_id.required' => 'The division field is required.',
        ];
    }
}
