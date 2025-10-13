<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Due;

use App\Rules\Due\DueDoesNotExceedObligation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

final class UpdateDueRequest extends FormRequest
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
            'amount' => [
                'required',
                'decimal:0,2',
                'min:0',
                new DueDoesNotExceedObligation(
                    $this->integer('obligation_id'),
                    $this->route('due'),
                ),
            ],
            'obligation_id' => ['required', 'integer', Rule::notIn([0])],
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
            'obligation_id.required' => 'The allocation field is required.',
            'obligation_id.integer' => 'The allocation field must be integer.',
        ];
    }
}
