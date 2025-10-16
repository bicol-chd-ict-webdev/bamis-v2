<?php

declare(strict_types=1);

namespace App\Rules;

use App\Models\ObjectDistribution;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

final readonly class UniqueExpenditurePerAllocation implements ValidationRule
{
    public function __construct(private int $allocationId) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = ObjectDistribution::query()->where('allocation_id', $this->allocationId)
            ->where('expenditure_id', $value)
            ->exists();

        if ($exists) {
            $fail('The expenditure has already been taken.');
        }
    }
}
