<?php

declare(strict_types=1);

namespace App\Rules;

use App\Models\Disbursement;
use App\Models\Obligation;
use Brick\Math\BigDecimal;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

final readonly class DisbursementDoesNotExceedObligation implements ValidationRule
{
    /**
     * @param  array<int, string|float|int|null>  $currentDisbursementFields
     */
    public function __construct(
        private int $obligationId,
        private array $currentDisbursementFields,
        private ?Disbursement $currentDisbursement = null // for updates
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $obligation = Obligation::with('disbursements')
            ->withSum('taggedObligations', 'amount')
            ->find($this->obligationId);

        if (! $obligation) {
            $fail('The selected obligation does not exist.');

            return;
        }

        $existingTotal = BigDecimal::zero();

        foreach ($obligation->disbursements as $disbursement) {
            if ($this->currentDisbursement && $disbursement->id === $this->currentDisbursement->id) {
                continue; // skip self if updating
            }

            $existingTotal = $existingTotal->plus($disbursement->total_amount);
        }

        $newDisbursementTotal = BigDecimal::zero();

        foreach ($this->currentDisbursementFields as $fieldValue) {
            if ($fieldValue !== null) {
                $newDisbursementTotal = $newDisbursementTotal->plus(BigDecimal::of((string) $fieldValue));
            }
        }

        $totalAfterSubmission = $existingTotal->plus($newDisbursementTotal);
        $obligationAmount = BigDecimal::of((string) $obligation->amount)
            ->plus((string) ($obligation->tagged_obligations_sum_amount ?? '0'));

        if ($totalAfterSubmission->isGreaterThan($obligationAmount)) {
            $remaining = $obligationAmount->minus($existingTotal);
            $formattedRemaining = number_format((float) $remaining->__toString(), 2);

            $fail("Total disbursement must not exceed the remaining obligation of ₱{$formattedRemaining}.");
        }
    }
}
