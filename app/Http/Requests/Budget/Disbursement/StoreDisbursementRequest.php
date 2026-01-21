<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Disbursement;

use App\Concerns\HasAuthenticatedUser;
use App\Rules\DisbursementDoesNotExceedObligation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ConditionalRules;
use Illuminate\Validation\Rule;

final class StoreDisbursementRequest extends FormRequest
{
    use HasAuthenticatedUser;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->authenticatedUser();

        return $user->hasRole('Budget');
    }

    /**
     * @return array<string, ValidationRule|ConditionalRules|array<mixed>|string>
     */
    public function rules(): array
    {
        $numericRule = ['numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'];

        return [
            'net_amount' => array_merge(['required'], $numericRule, [
                new DisbursementDoesNotExceedObligation(
                    (int) $this->integer('obligation_id'),
                    [
                        $this->inputAsFloat('net_amount'),
                        $this->inputAsFloat('tax'),
                        $this->inputAsFloat('retention'),
                        $this->inputAsFloat('penalty'),
                        $this->inputAsFloat('absences'),
                        $this->inputAsFloat('other_deductions'),
                    ]
                ),
            ]),
            'date' => ['required', Rule::date()->format('Y-m-d')],
            'obligation_id' => ['required', 'integer', Rule::notIn([0])],
            'check_date' => Rule::when((bool) $this->input('check_date'), ['string', Rule::date()->format('Y-m-d')], ['nullable']),
            'check_number' => Rule::when((bool) $this->input('check_number'), ['string'], ['nullable']),
            'tax' => Rule::when((bool) $this->input('tax'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'retention' => Rule::when((bool) $this->input('retention'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'penalty' => Rule::when((bool) $this->input('penalty'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'absences' => Rule::when((bool) $this->input('absences'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'other_deductions' => Rule::when((bool) $this->input('other_deductions'), ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'min:0'], ['nullable']),
            'remarks' => Rule::when((bool) $this->input('remarks'), ['required', 'string', 'min:3', 'max:255'], ['nullable']),
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

    /**
     * Safely cast input to float after checking it's numeric.
     */
    private function inputAsFloat(string $key): float
    {
        $value = $this->input($key);

        return is_numeric($value) ? (float) $value : 0.0;
    }
}
