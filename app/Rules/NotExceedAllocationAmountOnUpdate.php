<?php

declare(strict_types=1);

namespace App\Rules;

use App\Models\Allocation;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use NumberFormatter;

class NotExceedAllocationAmountOnUpdate implements ValidationRule
{
    public function __construct(
        private readonly int $allocationId,
        private readonly string $relationshipMethod,
        private readonly Model $excludeModel,
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $allocation = Allocation::find($this->allocationId);

        if (! $allocation) {
            $fail('The selected allocation does not exist.');

            return;
        }

        if (! is_numeric($value)) {
            $fail('The :attribute must be a numeric value.');

            return;
        }

        if (! method_exists($allocation, $this->relationshipMethod)) {
            $fail("Invalid allocation relationship: {$this->relationshipMethod}.");

            return;
        }

        /** @var Model&object{id: int|string} $excludeModel */
        $excludeModel = $this->excludeModel;

        $relation = $allocation->{$this->relationshipMethod}();
        /** @var Builder<Model> $relation */
        $totalDistributed = BigDecimal::of((string) $relation
            ->where('id', '!=', $excludeModel->id)
            ->sum('amount'));

        $allocationAmount = BigDecimal::of((string) $allocation->amount);
        $remaining = $allocationAmount->minus($totalDistributed);
        $requested = BigDecimal::of((string) $value);

        if ($requested->isGreaterThan($remaining)) {
            $formatter = new NumberFormatter('en_PH', NumberFormatter::CURRENCY);
            $formattedRemaining = $formatter->formatCurrency(
                (float) $remaining->toScale(2, RoundingMode::DOWN)->__toString(),
                'PHP'
            );

            $fail("The :attribute must not exceed the remaining allocation of {$formattedRemaining}.");
        }
    }
}
