<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use App\Contracts\Report\FormulaServiceInterface;

final class FormulaBuilder implements FormulaServiceInterface
{
    public function add(string ...$cells): string
    {
        return '='.implode('+', $cells);
    }

    public function subtract(string $columnA, string $columnB): string
    {
        return sprintf('=%s-%s', $columnA, $columnB);
    }

    public function percentage(string $numerator, string $denominator): string
    {
        return sprintf('=IF(%s=0,0,%s/%s)', $denominator, $numerator, $denominator);
    }

    public function sum(string $cellStart, string $cellEnd): string
    {
        return sprintf('=SUM(%s:%s)', $cellStart, $cellEnd);
    }

    public function sumIf(string $targetColumn, string $criteria, string $column, int $start, int $end): string
    {
        return sprintf('=SUMIF($%s$%d:$%s$%d, %s, %s%d:%s%d)', $targetColumn, $start, $targetColumn, $end, $criteria, $column, $start, $column, $end);
    }
}
