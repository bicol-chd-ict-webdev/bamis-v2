<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AllotmentClass;

final class AllotmentClassFormulaService
{
    /**
     * Return rows from $rows that exist in $sources
     *
     * @param  array<int, int|string>  $rows
     * @param  array<int, int|string>  $sources
     * @return array<int, int|string>
     */
    public function filterBySource(array $rows, array $sources): array
    {
        return array_filter($rows, fn (int|string $r): bool => in_array($r, $sources, true));
    }
}
