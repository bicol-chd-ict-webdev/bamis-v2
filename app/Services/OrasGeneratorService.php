<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Allocation;
use Carbon\CarbonImmutable;

class OrasGeneratorService
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function generate(array $attributes): string
    {
        /** @var Allocation $allocation */
        $allocation = Allocation::findOrFail($attributes['allocation_id']);

        assert(is_string($attributes['date']));
        $date = CarbonImmutable::parse($attributes['date']);

        return $this->buildPrefixBase($allocation, $date);
    }

    private function buildPrefixBase(Allocation $allocation, CarbonImmutable $date): string
    {
        $acronym = $allocation->lineItem?->acronym;

        $codeBase = match ($allocation->appropriation_id) {
            1 => $acronym,
            2 => $acronym.'-'.mb_substr((string) $allocation->saa_number, -4),
            default => $this->formatSaroNumber($allocation->saro_number),
        };

        $separator = $allocation->appropriation_type_id === 2 ? '(CA)' : '-';

        return sprintf(
            '%s%s%s-%s-%s-%02d',
            $codeBase,
            $separator,
            $allocation->allotmentClass?->code,
            $allocation->appropriationType?->code,
            $date->year,
            $date->month,
        );
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
