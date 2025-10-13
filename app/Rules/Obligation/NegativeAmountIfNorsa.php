<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

final readonly class NegativeAmountIfNorsa implements ValidationRule
{
    public function __construct(private mixed $isNorsa) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($this->isNorsa && $value >= 0) {
            $fail('The :attribute must be a negative value if the obligation is NORSA.');
        }
    }
}
