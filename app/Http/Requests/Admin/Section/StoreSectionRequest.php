<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin\Section;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = auth()->user();

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
            'name' => ['required', 'string', 'min:3', 'max:255', Rule::unique('sections')->ignore($this->section)->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:3', 'max:25'],
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
            'required' => 'The :attribute field is required.',
            'string' => 'The :attribute must be a string.',
            'min' => [
                'string' => 'The :attribute must be at least :min characters.',
            ],
            'max' => [
                'string' => 'The :attribute may not be greater than :max characters.',
            ],
            'unique' => 'The :attribute has already been taken.',
            'integer' => 'The :attribute must be an integer.',
            'regex' => 'The :attribute format is invalid.',
            'division_id.required' => 'The division field is required.',
        ];
    }
}
