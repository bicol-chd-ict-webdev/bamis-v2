<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Expenditure;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreExpenditureRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:50', 'regex:/^[a-zA-Z\/\-\(\)\s&,]+$/', Rule::unique(table: 'expenditures')->whereNull('deleted_at')],
            'code' => ['required', 'digits:10', Rule::unique('expenditures', 'code')->whereNull('deleted_at')],
            'allotment_class_id' => ['required', 'integer'],
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
            'allotment_class_id.required' => 'The allotment class field is required.',
            'allotment_class_id.integer' => 'The allotment class field must be an integer.',
        ];
    }
}
