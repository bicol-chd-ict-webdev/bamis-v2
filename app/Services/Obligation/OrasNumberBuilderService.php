<?php

declare(strict_types=1);

namespace App\Services\Obligation;

use App\Enums\AppropriationSourceEnum;
use App\Models\Allocation;
use Carbon\CarbonImmutable;

final class OrasNumberBuilderService
{
    public function buildWithMonth(Allocation $allocation, CarbonImmutable $date): string
    {
        return $this->build($allocation, $date).sprintf('-%02d', $date->month);
    }

    public function build(Allocation $allocation, CarbonImmutable $date): string
    {
        $acronym = $allocation->lineItem?->acronym;
        $isRlip = $allocation->appropriation_source === AppropriationSourceEnum::AUTOMATIC;

        $codeBase = match ($allocation->appropriation_id) {
            1 => $isRlip ? $acronym.'-RLIP' : $acronym,
            2 => $acronym.'-'.mb_substr((string) $allocation->saa_number, -4),
            default => $this->formatSaroNumber($allocation->saro_number),
        };

        $separator = $allocation->appropriation_type_id === 2 ? '(CA)' : '-';

        return sprintf(
            '%s%s%s-%s-%d',
            $codeBase,
            $separator,
            $allocation->allotmentClass?->code,
            $allocation->appropriationType?->code,
            $date->year
        );
    }

    private function formatSaroNumber(?string $saroNumber): string
    {
        if (! in_array($saroNumber, [null, '', '0'], true) && str_contains($saroNumber, '-')) {
            [, $number] = explode('-', $saroNumber, 2);

            return 'SARO-'.mb_ltrim($number, '0');
        }

        return 'SARO';
    }
}
