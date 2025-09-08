<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Obligation;

use App\Enums\NorsaType;
use App\Enums\Recipient;
use App\Rules\NegativeAmountIfTransferred;
use App\Rules\Obligation\ObligationDoesNotExceedAllotmentOnStore;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreObligationRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string|\Illuminate\Validation\ConditionalRules>
     */
    public function rules(): array
    {
        return [
            'allocation_id' => ['required', 'integer', Rule::notIn([0])],
            'office_allotment_id' => ['required', 'integer', Rule::notIn([0])],
            'object_distribution_id' => ['required', 'integer', Rule::notIn([0])],
            'date' => ['required', Rule::date()->format('Y-m-d')],
            'amount' => [
                'required',
                'numeric',
                'regex:/^-?\d+(\.\d{1,2})?$/',
                new NegativeAmountIfTransferred($this->boolean('is_transferred')),
                new ObligationDoesNotExceedAllotmentOnStore(
                    $this->integer('allocation_id'),
                    $this->integer('office_allotment_id'
                    )
                ),
            ],
            'particulars' => ['required', 'string', 'min:3', 'max:200'],
            'creditor' => ['required', 'string', 'min:3', 'max:100'],
            'reference_number' => ['nullable', 'string', 'min:9', 'max:15'],
            'dtrak_number' => ['nullable', 'regex:/^\d+$/', 'min:0', 'max:99999', 'digits_between:4,10'],
            'is_batch_process' => Rule::when((bool) $this->input('is_batch_process'), ['boolean'], ['nullable']),
            'norsa_type' => Rule::when((bool) $this->input('norsa_type'), [Rule::enum(NorsaType::class)], ['nullable']),
            'is_transferred' => Rule::when((bool) $this->input('is_transferred'), ['boolean'], ['nullable']),
            'recipient' => [Rule::requiredIf($this->input('is_transferred') === true), Rule::when((bool) $this->input('recipient'), [Rule::enum(Recipient::class)], ['nullable'])],
        ];
    }

    /**
     * @return array<string, string|array<string, string>>
     */
    public function messages(): array
    {
        return [
            'allocation_id.required' => 'The allocation field is required.',
            'allocation_id.integer' => 'The allocation field must be an integer.',
            'allocation_id.not_in' => 'The allocation field is required.',
            'office_allotment_id.required' => 'The office allotment field is required.',
            'office_allotment_id.integer' => 'The office allotment field must be an integer.',
            'office_allotment_id.not_in' => 'The office allotment field is required.',
            'object_distribution_id.required' => 'The object distribution field is required.',
            'object_distribution_id.integer' => 'The object distribution field must be an integer.',
            'object_distribution_id.not_in' => 'The object distribution field is required.',
        ];
    }
}
