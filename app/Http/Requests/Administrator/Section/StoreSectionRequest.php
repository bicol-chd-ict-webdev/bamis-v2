<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\Section;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var User|null $user */
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
            'name' => ['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z,\-\s]+$/', Rule::unique('sections')->ignore($this->section)->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:2', 'max:25', 'regex:/^[A-Z\/\- ]+$/'],
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
            'division_id.required' => 'The division field is required.',
        ];
    }
}
