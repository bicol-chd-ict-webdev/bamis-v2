<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\ObjectDistribution;

use App\Rules\NotExceedAllocationAmountOnStore;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

final class StoreObjectDistributionRequest extends FormRequest
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
            'allocation_id' => ['required', 'integer'],
            'expenditure_id' => [
                'required',
                'integer',
                Rule::notIn([0]),
                Rule::unique('object_distributions')
                    ->where(fn (Builder $query): Builder => $query->where('allocation_id', $this->integer('allocation_id')))],
            'amount' => ['required', 'decimal:0,2', 'min:0', new NotExceedAllocationAmountOnStore($this->integer('allocation_id'), 'objectDistributions')],
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
            'allocation_id.required' => 'The allocation field is required.',
            'allocation_id.integer' => 'The allocation field must be integer.',
            'expenditure_id.required' => 'The expenditure field is required.',
            'expenditure_id.integer' => 'The expenditure field must be integer.',
            'expenditure_id.unique' => 'The expenditure has already been taken.',
            'expenditure_id.not_in' => 'The expenditure field is required.',
        ];
    }
}
