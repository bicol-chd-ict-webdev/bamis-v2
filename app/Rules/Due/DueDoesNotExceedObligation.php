<?php

declare(strict_types=1);

namespace App\Rules\Due;

use App\Models\Due;
use App\Models\Obligation;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use NumberFormatter;

final readonly class DueDoesNotExceedObligation implements ValidationRule
{
    public function __construct(
        private int $obligationId,
        private ?Due $currentDue = null // for updates
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $obligation = Obligation::with('dues')->find($this->obligationId);

        if (! $obligation) {
            $fail('The selected obligation does not exist.');

            return;
        }

        $totalDueAndDemand = BigDecimal::zero();

        foreach ($obligation->dues as $due) {
            if ($this->currentDue && $due->id === $this->currentDue->id) {
                continue; // skip self if updating
            }

            $totalDueAndDemand = $totalDueAndDemand->plus($due->amount);
        }

        $obligationAmount = BigDecimal::of((string) $obligation->amount);
        $remaining = $obligationAmount->minus($totalDueAndDemand);

        if (! is_numeric($value)) {
            $fail('Invalid amount value.');

            return;
        }

        $requested = BigDecimal::of((string) $value);

        if ($requested->isGreaterThan($remaining)) {
            $formatter = new NumberFormatter('en_PH', NumberFormatter::CURRENCY);
            $formattedRemaining = $formatter->formatCurrency(
                (float) $remaining->toScale(2, RoundingMode::DOWN)->__toString(),
                'PHP'
            );

            $fail(sprintf('The :attribute due must not exceed the obligation of %s.', $formattedRemaining));
        }
    }
}
