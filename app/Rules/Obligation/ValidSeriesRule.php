<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\Allocation;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

final readonly class ValidSeriesRule implements ValidationRule
{
    public function __construct(private int $allocationId) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $allocation = Allocation::query()->find($this->allocationId);

        if (! $allocation) {
            return;
        }

        if ($allocation->appropriation_type_id === 1 && $value === '0001') {
            $fail('This series is not allowed for current allocation.');
        }
    }
}
