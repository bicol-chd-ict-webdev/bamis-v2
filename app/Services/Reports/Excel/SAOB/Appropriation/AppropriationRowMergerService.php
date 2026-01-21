<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Appropriation;

final class AppropriationRowMergerService
{
    /**
     * @param  array<string, array<int, int|string>>  ...$maps
     * @return array<string, array<int, int|string>>
     */
    public function merge(array ...$maps): array
    {
        /** @var array<string, array<int, int|string>> $result */
        $result = [];

        foreach ($maps as $map) {
            foreach ($map as $class => $rows) {
                $result[$class] = array_merge($result[$class] ?? [], $rows);
            }
        }

        return $result;
    }
}
