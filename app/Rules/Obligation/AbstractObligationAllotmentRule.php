<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\OfficeAllotment;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use NumberFormatter;

abstract class AbstractObligationAllotmentRule implements ValidationRule
{
    public function __construct(
        protected int $allocationId,
        protected int $officeAllotmentId,
    ) {}

    abstract protected function calculateTotalObligation(OfficeAllotment $officeAllotment): BigDecimal;

    final public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $officeAllotment = OfficeAllotment::query()->where([
            'id' => $this->officeAllotmentId,
            'allocation_id' => $this->allocationId,
        ])->first();

        if (! $officeAllotment) {
            $fail('The selected office allotment does not exist.');

            return;
        }

        if (! is_numeric($value)) {
            $fail('The :attribute must be a numeric value.');

            return;
        }

        $totalObligation = $this->calculateTotalObligation($officeAllotment);
        $officeAllotmentAmount = BigDecimal::of((string) $officeAllotment->amount);
        $remaining = $officeAllotmentAmount->minus($totalObligation);
        $requested = BigDecimal::of((string) $value);

        if ($requested->isGreaterThan($remaining)) {
            $formatter = new NumberFormatter('en_PH', NumberFormatter::CURRENCY);
            $formattedRemaining = $formatter->formatCurrency(
                (float) $remaining->toScale(2, RoundingMode::DOWN)->__toString(),
                'PHP'
            );

            $fail("The :attribute must not exceed the remaining office allotment of {$formattedRemaining}.");
        }
    }
}
