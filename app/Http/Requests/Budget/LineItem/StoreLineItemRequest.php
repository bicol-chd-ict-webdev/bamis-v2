<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\LineItem;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

final class StoreLineItemRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z0-9\-\(\)\ ]+$/', Rule::unique('line_items')->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:2', 'max:20', 'regex:/^[a-zA-Z&\- ]+$/', Rule::unique('line_items', 'acronym')->whereNull('deleted_at')],
            'code' => ['required', 'numeric', 'regex:/^\d{7,15}$/', Rule::unique('line_items', 'code')->whereNull('deleted_at')],
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
        ];
    }
}
