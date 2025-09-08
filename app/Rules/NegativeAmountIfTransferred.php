<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NegativeAmountIfTransferred implements ValidationRule
{
    public function __construct(protected bool $isTransferred) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($this->isTransferred && $value >= 0) {
            $fail('The :attribute must be a negative value when transfer is enabled.');
        }
    }
}
