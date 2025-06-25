<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\PapType;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StorePapTypeRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:50', 'regex:/^[a-zA-Z. ]+$/', Rule::unique(table: 'pap_types')->whereNull('deleted_at')],
            'code' => ['required', 'digits:15', Rule::unique('pap_types', 'code')->whereNull('deleted_at')],
        ];
    }
}
