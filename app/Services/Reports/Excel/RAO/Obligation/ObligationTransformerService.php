<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Obligation;

use App\Models\Allocation;
use Brick\Math\BigDecimal;
use Carbon\CarbonImmutable;

final class ObligationTransformerService
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function transform(Allocation $allocation): array
    {
        return $allocation->obligations
            ->groupBy(fn ($obligation): string => "{$obligation->oras_number}-{$obligation->series}")
            ->flatMap(function ($grouped) {
                $totalObligation = $grouped->sum('amount');
                $totalDisbursement = $grouped->sum('disbursements_sum_amount');

                return $grouped->values()->map(function ($obligation, $index) use ($totalObligation, $totalDisbursement): array {
                    $date = CarbonImmutable::parse($obligation->date);

                    return [
                        'date' => $date->format('F'),
                        'oras_date' => $date->format('m/d/Y'),
                        'oras_number' => $obligation->oras_number_reference,
                        'uacs_code' => $obligation->objectDistribution->expenditure_code ?? '',
                        'allotment' => $obligation->is_transferred ? $obligation->amount : '',
                        'creditor' => $obligation->creditor,
                        'particulars' => $obligation->particulars,
                        'is_cancelled' => $obligation->is_cancelled,
                        'due_and_demandable' => $obligation->dues_sum_amount,
                        'obligation' => $index === 0
                            ? ($obligation->is_transferred ? 0 : BigDecimal::of($totalObligation)->toScale(2))
                            : 0,
                        'disbursement' => $index === 0
                            ? BigDecimal::of($totalDisbursement)->toScale(2)
                            : 0,
                    ];
                });
            })
            ->values()
            ->all();
    }
}
