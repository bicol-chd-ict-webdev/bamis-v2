<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\Account;

use App\Concerns\HasAuthenticatedUser;
use App\Enums\AccountStatus;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreAccountRequest extends FormRequest
{
    use HasAuthenticatedUser;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->authenticatedUser();

        return $user->hasRole('Administrator');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'string', 'email:rfc,dns,strict', 'max:50', Rule::unique(User::class)],
            'status' => ['required', 'string', Rule::in(AccountStatus::cases())],
            'designation' => ['required', 'string', 'min:3', 'max:50'],
            'role' => ['required', 'string'],
        ];
    }
}
