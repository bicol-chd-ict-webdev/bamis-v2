<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\LineItem;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreLineItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        return $user && $user->hasRole('budget');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255', 'regex:/^[a-zA-Z0-9\-\(\)\ ]+$/', 'unique:line_items,name'],
            'acronym' => ['required', 'string', 'min:2', 'max:20', 'regex:/^[a-zA-Z&\- ]+$/'],
            'code' => ['required', 'string', 'digits:15'],
        ];
    }
}
