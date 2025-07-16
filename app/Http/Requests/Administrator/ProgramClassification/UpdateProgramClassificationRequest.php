<?php

declare(strict_types=1);

namespace App\Http\Requests\Administrator\ProgramClassification;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProgramClassificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var \App\Models\User|null $user */
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
            'name' => ['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z: ]*$/', Rule::unique('program_classifications')->ignore($this->route('program_classification'))->whereNull('deleted_at')],
            'code' => ['required', 'digits:15', Rule::unique('program_classifications', 'code')->ignore($this->route('program_classification'))->whereNull('deleted_at')],
        ];
    }
}
