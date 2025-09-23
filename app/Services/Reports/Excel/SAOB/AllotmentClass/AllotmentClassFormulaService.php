<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AllotmentClass;

class AllotmentClassFormulaService
{
    /**
     * Return rows from $rows that exist in $sources
     *
     * @param  int[]  $rows
     * @param  int[]  $sources
     * @return int[]
     */
    public function filterBySource(array $rows, array $sources): array
    {
        return array_filter($rows, fn (int $r): bool => in_array($r, $sources, true));
    }
}
