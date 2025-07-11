<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Disbursement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreDisbursementRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|\Illuminate\Validation\ConditionalRules|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'net_amount' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'],
            'date' => ['required', Rule::date()->format('Y-m-d')],
            'obligation_id' => ['required', 'integer', Rule::notIn([0])],
            'check_date' => Rule::when((bool) $this->input('check_date'), ['string', Rule::date()->format('Y-m-d')], ['nullable']),
            'check_number' => Rule::when((bool) $this->input('check_number'), ['string'], ['nullable']),
            'tax' => Rule::when((bool) $this->input('tax'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'retention' => Rule::when((bool) $this->input('retention'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'penalty' => Rule::when((bool) $this->input('penalty'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'absences' => Rule::when((bool) $this->input('absences'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'other_deductions' => Rule::when((bool) $this->input('other_deductions'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'remarks' => Rule::when((bool) $this->input('remarks'), ['required'], ['nullable']),
        ];
    }

    /**
     * @return array<string, string|array<string, string>>
     */
    public function messages(): array
    {
        return [
            'obligation_id.required' => 'The obligation field is required.',
            'obligation_id.integer' => 'The obligation field must be an integer.',
            'obligation_id.not_in' => 'The obligation field is required.',
        ];
    }
}
