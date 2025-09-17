<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\ObjectDistribution;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use NumberFormatter;

abstract class AbstractObligationObjectDistributionRule implements ValidationRule
{
    public function __construct(
        protected int $allocationId,
        protected int $objectDistributionId,
    ) {}

    abstract protected function calculateTotalObligation(ObjectDistribution $objectDistribution): BigDecimal;

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $objectDistribution = ObjectDistribution::where([
            'id' => $this->objectDistributionId,
            'allocation_id' => $this->allocationId,
        ])->first();

        if (! $objectDistribution) {
            $fail('The selected object distribution does not exist.');

            return;
        }

        if (! is_numeric($value)) {
            $fail('The :attribute must be a numeric value.');

            return;
        }

        $totalObligation = $this->calculateTotalObligation($objectDistribution);
        $objectDistributionAmount = BigDecimal::of((string) $objectDistribution->amount);
        $remaining = $objectDistributionAmount->minus($totalObligation);
        $requested = BigDecimal::of((string) $value);

        if ($requested->isGreaterThan($remaining)) {
            $formatter = new NumberFormatter('en_PH', NumberFormatter::CURRENCY);
            $formattedRemaining = $formatter->formatCurrency(
                (float) $remaining->toScale(2, RoundingMode::DOWN)->__toString(),
                'PHP'
            );

            $fail("The :attribute must not exceed the remaining object distribution of {$formattedRemaining}.");
        }
    }
}
