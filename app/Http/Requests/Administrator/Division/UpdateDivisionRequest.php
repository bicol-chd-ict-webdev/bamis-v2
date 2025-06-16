<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\Division;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateDivisionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'name' => ['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z,\-\s]+$/', Rule::unique('divisions')->ignore($this->route('division'))->whereNull('deleted_at')],
            'acronym' => ['required', 'string', 'min:3', 'max:25', 'regex:/^[A-Z\/\-]+$/'],
        ];
    }
}
