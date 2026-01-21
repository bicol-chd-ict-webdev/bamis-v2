<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\AllotmentClass;

use App\Concerns\HasAuthenticatedUser;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class StoreAllotmentClassRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'regex:/^[a-zA-Z ]+$/',
                Rule::unique('allotment_classes')
                    ->whereNull('deleted_at'),
            ],
            'acronym' => [
                'required',
                'string',
                'min:2',
                'max:4',
                'alpha',
                Rule::unique('allotment_classes', 'acronym')
                    ->whereNull('deleted_at'),
            ],
            'code' => [
                'required',
                'digits:2',
                Rule::unique('allotment_classes', 'code')
                    ->whereNull('deleted_at'),
            ],
        ];
    }
}
