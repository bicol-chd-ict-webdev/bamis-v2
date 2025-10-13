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
        return "={$columnA}-{$columnB}";
    }

    public function percentage(string $numerator, string $denominator): string
    {
        return "=IF({$denominator}=0,0,{$numerator}/{$denominator})";
    }

    public function sum(string $cellStart, string $cellEnd): string
    {
        return "=SUM({$cellStart}:{$cellEnd})";
    }

    public function sumIf(string $targetColumn, string $criteria, string $column, int $start, int $end): string
    {
        return "=SUMIF(\${$targetColumn}\${$start}:\${$targetColumn}\${$end}, {$criteria}, {$column}{$start}:{$column}{$end})";
    }
}
