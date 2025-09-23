<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Obligation;

use App\Models\Allocation;
use Brick\Math\BigDecimal;
use Carbon\CarbonImmutable;

class ObligationTransformerService
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function transform(Allocation $allocation): array
    {
        return $allocation->obligations
            ->map(function ($obligation): array {
                $date = CarbonImmutable::parse($obligation->date);

                return [
                    'date' => $date->format('F'),
                    'oras_date' => $date->format('m/d/Y'),
                    'oras_number' => $obligation->oras_number_reference,
                    'uacs_code' => $obligation->objectDistribution->expenditure_code ?? '',
                    'allotment' => $obligation->is_transferred ? $obligation->amount : '',
                    'creditor' => $obligation->creditor,
                    'particulars' => $obligation->particulars,
                    'obligation' => $obligation->is_transferred ? 0 : BigDecimal::of($obligation->amount)->toScale(2),
                    'disbursement' => BigDecimal::of($obligation->disbursements_sum_amount)->toScale(2),
                ];
            })
            ->values()
            ->all();
    }
}
