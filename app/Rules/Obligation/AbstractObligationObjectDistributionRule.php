<?php

declare(strict_types=1);

namespace App\Rules\Obligation;

use App\Models\ObjectDistribution;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Collection;
use NumberFormatter;

abstract class AbstractObligationObjectDistributionRule implements ValidationRule
{
    public function __construct(
        protected int $allocationId,
        protected int $objectDistributionId,
        protected ?string $norsaType = null,
    ) {}

    abstract protected function calculateTotalObligation(ObjectDistribution $objectDistribution): BigDecimal;

    final public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $objectDistribution = ObjectDistribution::query()->where([
            'id' => $this->objectDistributionId,
            'allocation_id' => $this->allocationId,
        ])->first();

        if (! $objectDistribution) {
            $fail('The expenditure field is required.');

            return;
        }

        if (! is_numeric($value)) {
            $fail('The :attribute must be a numeric value.');

            return;
        }

        // ✅ Explicitly cast to array before collect()
        /** @var array<int, array{amount: string|int|float|null}> $offices */
        $offices = (array) data_get(request()->all(), 'offices', []);

        /** @var Collection<int, BigDecimal> $amounts */
        $amounts = collect($offices)
            ->pluck('amount')
            ->filter(static fn (mixed $v): bool => is_numeric($v))
            ->map(static fn (string|int|float $v): BigDecimal => BigDecimal::of((string) $v));

        /** @var BigDecimal $totalRequested */
        $totalRequested = $amounts->reduce(
            static fn (BigDecimal $carry, BigDecimal $v): BigDecimal => $carry->plus($v),
            BigDecimal::zero()
        );

        $totalObligation = $this->calculateTotalObligation($objectDistribution);
        $objectDistributionAmount = BigDecimal::of((string) $objectDistribution->amount);
        $remaining = $objectDistributionAmount->minus($totalObligation);

        // ✅ Rule: sum must not be less than base amount (only for norsaType)
        if ($this->norsaType !== null) {
            if ($totalRequested->abs()->isLessThan($objectDistributionAmount)) {
                $fail(sprintf(
                    'The total obligation must not be less than the remaining expenditure of %s.',
                    $this->currencyFormatter($objectDistributionAmount)
                ));

                return;
            }

            if ($totalRequested->abs()->isGreaterThan($remaining)) {
                $fail(sprintf(
                    'The total obligation must not exceed the remaining expenditure of %s.',
                    $this->currencyFormatter($remaining)
                ));
            }

            return;
        }

        // ✅ Rule: sum must not exceed remaining
        if ($totalRequested->isGreaterThan($remaining)) {
            $fail(sprintf(
                'The total obligation must not exceed the remaining expenditure of %s.',
                $this->currencyFormatter($remaining)
            ));
        }
    }

    private function currencyFormatter(BigDecimal $amount): string
    {
        $formatter = new NumberFormatter('en_PH', NumberFormatter::CURRENCY);

        return $formatter->formatCurrency(
            (float) $amount->toScale(2, RoundingMode::DOWN)->__toString(),
            'PHP'
        ) ?: 'PHP 0.00';
    }
}
