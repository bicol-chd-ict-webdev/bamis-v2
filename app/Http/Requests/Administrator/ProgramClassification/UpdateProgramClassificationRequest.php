<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\ProgramClassification;

use App\Concerns\HasAuthenticatedUser;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateProgramClassificationRequest extends FormRequest
{
    use HasAuthenticatedUser;

    /**
     * Determine if the user is authorized to make this request.
     */
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
                'regex:/^[a-zA-Z: ]*$/',
                Rule::unique('program_classifications')
                    ->ignore($this->route('program_classification'))
                    ->whereNull('deleted_at'),
            ],
            'code' => [
                'required',
                'digits:15',
                Rule::unique('program_classifications', 'code')
                    ->ignore($this->route('program_classification'))
                    ->whereNull('deleted_at'),
            ],
        ];
    }
}
