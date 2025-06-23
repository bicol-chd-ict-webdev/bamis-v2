<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\AllotmentClass;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreAllotmentClassRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:50', 'regex:/^[a-zA-Z ]+$/', Rule::unique(table: 'allotment_classes')->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:2', 'max:4', 'alpha', Rule::unique('allotment_classes', 'acronym')->whereNull('deleted_at')],
            'code' => ['required', 'string', 'digits:2', Rule::unique('allotment_classes', 'code')->whereNull('deleted_at')],
        ];
    }
}
