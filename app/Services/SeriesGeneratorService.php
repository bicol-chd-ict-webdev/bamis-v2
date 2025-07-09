<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Allocation;
use Carbon\CarbonImmutable;

class SeriesGeneratorService
{
    /**
     * @param array{
     *   allocation_id: int,
     *   date: string,
     *   is_batch_process?: bool
     * } $attributes
     */
    public function generate(array $attributes): string
    {
        /** @var Allocation $allocation */
        $allocation = Allocation::findOrFail($attributes['allocation_id']);
        $date = CarbonImmutable::parse((string) $attributes['date']);

        $basePrefix = $this->buildPrefixBase($allocation, $date);

        $referenceCode = sprintf('%s-%02d', $basePrefix, $date->month);
        $seriesPrefix = $basePrefix;

        /** @var string|null $lastSeries */
        $lastSeries = $allocation->obligations()
            ->where('series', 'like', "$seriesPrefix-%")
            ->latest('series')
            ->value('series');

        $nextSeries = '0002';

        if ($lastSeries && str_starts_with((string) $lastSeries, $seriesPrefix)) {
            $last = mb_substr((string) $lastSeries, mb_strrpos((string) $lastSeries, '-') + 1);

            preg_match('/^(\d{4})([A-Z]*)$/', $last, $m);
            $num = $m[1] ?? '0002';
            $suffix = $m[2] ?? '';

            $isBatch = $attributes['is_batch_process'] ?? false;

            if ($isBatch === true) {
                $nextSeries = $num.$this->incrementAlpha($suffix);
            } else {
                $nextNum = mb_str_pad((string) ((int) $num + 1), 4, '0', STR_PAD_LEFT);
                $nextSeries = $nextNum;
            }
        }

        return "$referenceCode-$nextSeries";
    }

    private function buildPrefixBase(Allocation $allocation, CarbonImmutable $date): string
    {
        $codeBase = match (true) {
            $allocation->appropriation_id === 1 => $allocation->lineItem?->acronym,
            $allocation->appropriation_id === 2 => $allocation->additional_code,
            default => $this->formatSaroNumber($allocation->saro_number),
        };

        return sprintf(
            '%s-%s-%s-%d',
            $codeBase,
            $allocation->allotmentClass?->code,
            $allocation->appropriationType?->code,
            $date->year
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

    private function incrementAlpha(string $suffix): string
    {
        if ($suffix === '') {
            return 'A';
        }

        $chars = mb_str_split($suffix);
        $i = count($chars) - 1;

        while ($i >= 0) {
            if ($chars[$i] !== 'Z') {
                $chars[$i] = chr(ord($chars[$i]) + 1);

                return implode('', $chars);
            }

            $chars[$i] = 'A';
            $i--;
        }

        array_unshift($chars, 'A');

        return implode('', $chars);
    }
}
