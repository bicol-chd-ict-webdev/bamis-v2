<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\AppropriationType;

use App\Concerns\HasAuthenticatedUser;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateAppropriationTypeRequest extends FormRequest
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
                'max:25',
                'regex:/^[A-Za-z\s]+$/',
                Rule::unique('appropriation_types')
                    ->ignore($this->route('appropriation_type'))
                    ->whereNull('deleted_at'),
            ],
            'acronym' => [
                'required',
                'string',
                'min:3',
                'max:7',
                'alpha',
                'regex:/^[A-Z]+$/',
                Rule::unique('appropriation_types', 'acronym')
                    ->ignore($this->route('appropriation_type'))
                    ->whereNull('deleted_at'),
            ],
            'code' => [
                'required',
                'digits:6',
                Rule::unique('appropriation_types', 'code')
                    ->ignore($this->route('appropriation_type'))
                    ->whereNull('deleted_at'),
            ],
        ];
    }
}
