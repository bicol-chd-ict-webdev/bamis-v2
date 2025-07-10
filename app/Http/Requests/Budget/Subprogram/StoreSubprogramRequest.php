<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Subprogram;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreSubprogramRequest extends FormRequest
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
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:50', 'regex:/^[A-Za-z\s\-]+$/', Rule::unique(table: 'subprograms')->whereNull('deleted_at')],
            'program_id' => ['required', 'integer', Rule::notIn([0])],
        ];
    }

    /**
     * @return array<string, string|array<string, string>>
     */
    public function messages(): array
    {
        return [
            'program_id.required' => 'The program field is required.',
            'program_id.integer' => 'The program field must be an integer.',
            'program_id.not_in' => 'The program field is required.',
        ];
    }
}
