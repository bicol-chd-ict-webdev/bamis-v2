<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\OfficeAllotment;

use App\Rules\NotExceedAllocationAmountOnStore;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreOfficeAllotmentRequest extends FormRequest
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
            'section_id' => [
                'required',
                'integer',
                Rule::unique('office_allotments')
                    ->where(fn (Builder $query): Builder => $query->where('allocation_id', $this->integer('allocation_id')))],
            'amount' => ['required', 'decimal:0,2', 'min:0', new NotExceedAllocationAmountOnStore($this->integer('allocation_id'), 'officeAllotments')],
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
            'section_id.required' => 'The section field is required.',
            'section_id.integer' => 'The section field must be integer.',
            'section_id.unique' => 'The section has already been taken.',
        ];
    }
}
