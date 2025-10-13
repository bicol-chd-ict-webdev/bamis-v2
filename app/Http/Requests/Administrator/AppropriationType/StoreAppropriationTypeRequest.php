<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\AppropriationType;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

final class StoreAppropriationTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        return $user && $user->hasRole('Administrator');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:25', 'regex:/^[A-Za-z\s]+$/', Rule::unique('appropriation_types')->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:3', 'max:7', 'alpha', Rule::unique('appropriation_types', 'acronym')->whereNull('deleted_at')],
            'code' => ['required', 'digits:6', Rule::unique('appropriation_types', 'code')->whereNull('deleted_at')],
        ];
    }
}
