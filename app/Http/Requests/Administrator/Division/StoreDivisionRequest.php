<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\Division;

use App\Concerns\HasAuthenticatedUser;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreDivisionRequest extends FormRequest
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
                'regex:/^[a-zA-Z,\-\s]+$/',
                Rule::unique('divisions', 'name')
                    ->ignore('division')
                    ->whereNull('deleted_at'),
            ],
            'acronym' => ['required', 'string', 'min:2', 'max:25', 'regex:/^[A-Z\/\-]+$/'],
        ];
    }
}
