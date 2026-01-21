<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\ProjectType;

use App\Concerns\HasAuthenticatedUser;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UpdateProjectTypeRequest extends FormRequest
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
                'max:50',
                'regex:/^[a-zA-Z. ]+$/',
                Rule::unique('project_types')
                    ->ignore($this->route('project_type'))
                    ->whereNull('deleted_at'),
            ],
            'code' => [
                'required',
                'digits:15',
                Rule::unique('project_types', 'code')
                    ->ignore($this->route('project_type'))
                    ->whereNull('deleted_at'),
            ],
        ];
    }
}
