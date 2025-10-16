<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Obligation;

use App\Enums\NorsaType;
use App\Enums\Recipient;
use App\Rules\NegativeAmountIfTransferred;
use App\Rules\Obligation\NegativeAmountIfNorsa;
use App\Rules\Obligation\ObligationDoesNotExceedAllotmentOnUpdate;
use App\Rules\Obligation\ObligationDoesNotExceedObjectDistributionOnUpdate;
use App\Rules\Obligation\ValidSeriesRule;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

final class UpdateObligationRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        return $user && $user->hasRole('Budget');
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string|\Illuminate\Validation\ConditionalRules>
     */
    public function rules(): array
    {
        return [
            'allocation_id' => ['required', 'integer', Rule::notIn([0])],
            'object_distribution_id' => ['required', 'integer', Rule::notIn([0])],
            'date' => ['required', Rule::date()->format('Y-m-d')],
            'offices' => ['required', 'array', 'min:1'],
            'offices.*.section_id' => ['required', 'integer', Rule::notIn([0])],
            'offices.*.office_allotment_id' => ['required', 'integer', Rule::notIn([0])],
            'offices.*.amount' => [
                'required',
                'numeric',
                'regex:/^-?\d+(\.\d{1,2})?$/',
                new NegativeAmountIfTransferred($this->boolean('is_transferred')),
                new NegativeAmountIfNorsa($this->input('norsa_type')),
                new ObligationDoesNotExceedObjectDistributionOnUpdate(
                    $this->integer('allocation_id'),
                    $this->integer('object_distribution_id'),
                    $this->integer('id'),
                    is_string($this->input('norsa_type')) ? $this->input('norsa_type') : null,
                ),
                /**
                 * @param  Closure(string, string|null): \Illuminate\Translation\PotentiallyTranslatedString  $fail
                 */
                function (string $attribute, mixed $value, Closure $fail): void {
                    if (preg_match('/^offices\.(\d+)\.amount$/', $attribute, $matches)) {
                        $index = (int) $matches[1];
                        $officeAllotmentIdInput = $this->input("offices.$index.office_allotment_id");
                        $officeAllotmentId = is_numeric($officeAllotmentIdInput)
                            ? (int) $officeAllotmentIdInput
                            : 0;

                        if ($officeAllotmentId > 0) {
                            (new ObligationDoesNotExceedAllotmentOnUpdate(
                                $this->integer('allocation_id'),
                                $officeAllotmentId,
                                $this->integer('id'),
                            ))->validate($attribute, $value, $fail);
                        }
                    }
                },
            ],
            'particulars' => ['required', 'string', 'min:3', 'max:500'],
            'creditor' => ['required', 'string', 'min:3', 'max:100'],
            'reference_number' => ['nullable', 'string', 'min:9', 'max:15'],
            'dtrak_number' => ['nullable', 'regex:/^\d+$/', 'min:0', 'max:99999', 'digits_between:4,10'],
            'is_batch_process' => Rule::when((bool) $this->input('is_batch_process'), ['boolean'], ['nullable']),
            'norsa_type' => Rule::when((bool) $this->input('norsa_type'), [Rule::enum(NorsaType::class)], ['nullable']),
            'is_cancelled' => Rule::when((bool) $this->input('is_cancelled'), ['boolean'], ['nullable']),
            'is_transferred' => Rule::when((bool) $this->input('is_transferred'), ['boolean'], ['nullable']),
            'recipient' => [
                Rule::requiredIf($this->input('is_transferred') === true),
                Rule::when((bool) $this->input('recipient'), [Rule::enum(Recipient::class)], ['nullable']),
            ],
            'series' => [
                'required',
                'string',
                'min:4',
                'max:5',
                new ValidSeriesRule($this->integer('allocation_id')),
            ],
            'tagged_obligation_id' => [
                Rule::when((bool) $this->input('tagged_obligation_id'), ['required', 'integer', Rule::notIn([0])], ['nullable']),
            ],
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
            'object_distribution_id.required' => 'The expenditure field is required.',
            'object_distribution_id.integer' => 'The expenditure field must be an integer.',
            'object_distribution_id.not_in' => 'The expenditure field is required.',
            'offices.*.section_id.required' => 'The office field is required.',
            'offices.*.section_id.not_in' => 'The office field is required.',
            'offices.*.office_allotment_id.required' => 'The wfp code field is required.',
            'offices.*.office_allotment_id.not_in' => 'The wfp code field is required.',
            'offices.*.amount.required' => 'The amount field is required.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'offices.*.section_id' => 'office',
            'offices.*.office_allotment_id' => 'wfp code',
            'offices.*.amount' => 'amount',
        ];
    }

    /**
     * @return array{
     *     offices: array<int, array{
     *         office_allotment_id: int,
     *         section_id?: int|null,
     *         amount: numeric-string|float|int
     *     }>,
     *     oras_number?: string,
     *     allocation_id?: int,
     *     series?: string,
     *     creditor?: string,
     *     particulars?: string,
     *     recipient?: string|null,
     *     norsa_type?: string|null,
     *     is_cancelled?: bool|null,
     *     is_transferred?: bool|null,
     *     dtrak_number?: string|null,
     *     reference_number?: string|null,
     *     tagged_obligation_id?: int|null
     * }
     */
    public function validated($key = null, $default = null): array
    {
        /** @var array{
         *     offices: array<int, array{
         *         office_allotment_id: int,
         *         section_id?: int|null,
         *         amount: numeric-string|float|int
         *     }>,
         *     oras_number?: string,
         *     allocation_id?: int,
         *     series?: string,
         *     creditor?: string,
         *     particulars?: string,
         *     recipient?: string|null,
         *     norsa_type?: string|null,
         *     is_cancelled?: bool|null,
         *     is_transferred?: bool|null,
         *     dtrak_number?: string|null,
         *     reference_number?: string|null,
         *     tagged_obligation_id?: int|null
         * } $validated */
        $validated = parent::validated($key, $default);

        return $validated;
    }
}
