<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\AppropriationSource;
use App\Models\Allocation;
use Carbon\CarbonImmutable;

class OrasNumberBuilderService
{
    public function build(Allocation $allocation, CarbonImmutable $date): string
    {
        $acronym = $allocation->lineItem?->acronym;
        $isRlip = $allocation->appropriation_source === AppropriationSource::AUTOMATIC;

        $codeBase = match ($allocation->appropriation_id) {
            1 => $isRlip ? "{$acronym}-RLIP" : $acronym,
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

    public function buildWithMonth(Allocation $allocation, CarbonImmutable $date): string
    {
        return $this->build($allocation, $date).sprintf('-%02d', $date->month);
    }

    private function formatSaroNumber(?string $saroNumber): string
    {
        if ($saroNumber !== null && $saroNumber !== '' && $saroNumber !== '0' && str_contains($saroNumber, '-')) {
            [, $number] = explode('-', $saroNumber, 2);

            return 'SARO-'.mb_ltrim($number, '0');
        }

        return 'SARO';
    }
}
