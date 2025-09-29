<?php

declare(strict_types=1);

namespace App\Contracts\Report;

interface FormulaServiceInterface
{
    public function sum(string $cellStart, string $cellEnd): string;

    public function sumIf(string $targetColumn, string $criteria, string $column, int $start, int $end): string;

    public function subtract(string $columnA, string $columnB): string;

    public function percentage(string $numerator, string $denominator): string;

    public function add(string ...$cells): string;
}
