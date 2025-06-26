<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget\Program;

use App\Enums\AppropriationSource;
use App\Enums\Prexc;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProgramRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:50', 'regex:/^[A-Za-z\s]+$/', Rule::unique(table: 'programs')->ignore($this->route('program'))->whereNull('deleted_at')],
            'appropriation_source' => ['required', 'string', Rule::enum(AppropriationSource::class)],
            'code' => ['nullable', 'digits:7', Rule::unique('programs', 'code')->ignore($this->route('program'))->whereNull('deleted_at')],
            'prexc' => ['nullable', 'string', Rule::enum(Prexc::class)],
        ];
    }
}
