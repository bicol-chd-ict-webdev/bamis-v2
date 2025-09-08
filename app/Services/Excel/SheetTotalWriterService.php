<?php

declare(strict_types=1);

namespace App\Services\Excel;

use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SheetTotalWriterService
{
    protected array $columns = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS'];

    protected string $defaultFormatCode = '_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@';

    public function writeSubtotal(Worksheet $sheet, int $startRow, int $endRow, int $targetRow): void
    {
        foreach ($this->columns as $column) {
            if ($column === 'AR') {
                $formula = "=IF(M{$targetRow}=0, \"\", Z{$targetRow}/M{$targetRow})";
            } elseif ($column === 'AS') {
                $formula = "=IF(Z{$targetRow}=0, \"\", AM{$targetRow}/Z{$targetRow})";
            } else {
                $formula = "=SUM({$column}{$startRow}:{$column}{$endRow})";
            }
            $this->applyFormula($sheet, $column, $targetRow, $formula);
        }
    }

    public function writeTotalFromRows(Worksheet $sheet, array $sourceRows, int $targetRow): void
    {
        foreach ($this->columns as $column) {
            if ($column === 'AR') {
                $formula = "=IF(M{$targetRow}=0, \"\", Z{$targetRow}/M{$targetRow})";
            } elseif ($column === 'AS') {
                $formula = "=IF(Z{$targetRow}=0, \"\", AM{$targetRow}/Z{$targetRow})";
            } else {
                $sumParts = array_map(fn ($row): string => "{$column}{$row}", $sourceRows);
                $formula = '=SUM('.implode(',', $sumParts).')';
            }
            $this->applyFormula($sheet, $column, $targetRow, $formula);
        }
    }

    protected function applyFormula(Worksheet $sheet, string $col, int $row, string $formula): void
    {
        $cell = "{$col}{$row}";
        $sheet->setCellValue($cell, $formula);
        $sheet->getStyle($cell)->getFont()->setBold(true);

        // Apply different number format for AR and AS (percentage)
        if (in_array($col, ['AR', 'AS'], true)) {
            $sheet->getStyle($cell)->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);
        } else {
            $sheet->getStyle($cell)->getNumberFormat()->setFormatCode($this->defaultFormatCode);
        }
    }
}
