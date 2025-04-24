<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin\Division;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreDivisionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();

        return $user && $user->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255', Rule::unique('divisions')->ignore($this->division)->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:3', 'max:25'],
        ];
    }

    /**
     * @return array<string, string|array<string, string>>
     */
    public function messages(): array
    {
        return [
            'required' => 'The :attribute field is required.',
            'string' => 'The :attribute must be a string.',
            'min' => [
                'string' => 'The :attribute must be at least :min characters.',
            ],
            'max' => [
                'string' => 'The :attribute may not be greater than :max characters.',
            ],
            'unique' => 'The :attribute has already been taken.',
        ];
    }
}
