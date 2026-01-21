<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Obligation;

use App\Models\Allocation;
use Brick\Math\BigDecimal;
use Carbon\CarbonImmutable;

final class ObligationTransformerService
{
    /**
     * @return array<int, array{
     *     date: string,
     *     oras_date: string,
     *     oras_number: string,
     *     uacs_code: string,
     *     allotment: mixed,
     *     creditor: string|null,
     *     particulars: string|null,
     *     is_cancelled: bool|null,
     *     due_and_demandable: mixed,
     *     obligation: mixed,
     *     disbursement: mixed
     * }>
     */
    public function transform(Allocation $allocation): array
    {
        return $allocation->obligations
            ->groupBy(fn ($obligation): string => sprintf('%s-%s', $obligation->oras_number, $obligation->series))
            ->flatMap(function (\Illuminate\Support\Collection $grouped) {
                /** @var int|float $totalObligation */
                $totalObligation = $grouped->sum('amount') ?? 0;
                /** @var int|float $totalDisbursement */
                $totalDisbursement = $grouped->sum('disbursements_sum_amount') ?? 0;

                return $grouped->values()->map(function (\App\Models\Obligation $obligation, int $index) use ($totalObligation, $totalDisbursement): array {
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
