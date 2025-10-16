<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\Account;

use App\Enums\AccountStatus;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

final class UpdateAccountRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:300'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($this->route('account'))],
            'designation' => ['required', 'string', 'max:150'],
            'status' => ['required', 'string', Rule::in(AccountStatus::cases())],
            'role' => ['required', 'string'],
        ];
    }
}
