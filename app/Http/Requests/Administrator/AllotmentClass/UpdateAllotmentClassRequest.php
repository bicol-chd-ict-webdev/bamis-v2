<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\AllotmentClass;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

final class UpdateAllotmentClassRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:50', 'regex:/^[a-zA-Z ]+$/', Rule::unique('allotment_classes')->ignore($this->route('allotment_class'))->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:2', 'max:4', 'alpha', Rule::unique('allotment_classes', 'acronym')->ignore($this->route('allotment_class'))->whereNull('deleted_at')],
            'code' => ['required', 'digits:2', Rule::unique('allotment_classes', 'code')->ignore($this->route('allotment_class'))->whereNull('deleted_at')],
        ];
    }
}
