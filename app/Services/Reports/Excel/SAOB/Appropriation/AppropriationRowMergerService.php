<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Appropriation;

final class AppropriationRowMergerService
{
    /**
     * @param  array<string, array<int>>  ...$maps
     * @return array<string, array<int>>
     */
    public function merge(array ...$maps): array
    {
        /** @var array<string, array<int>> $result */
        $result = [];

        foreach ($maps as $map) {
            /** @var array<int> $rows */
            foreach ($map as $class => $rows) {
                $result[$class] = array_merge($result[$class] ?? [], $rows);
            }
        }

        return $result;
    }
}
