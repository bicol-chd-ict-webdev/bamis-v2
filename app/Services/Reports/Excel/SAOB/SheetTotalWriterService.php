<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB;

use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SheetTotalWriterService
{
    /** @var array<int, string> */
    private array $columns = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS'];

    private string $defaultFormatCode = '_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@';

    public function writeSubtotal(Worksheet $sheet, int $startRow, int $endRow, int $targetRow): void
    {
        foreach ($this->columns as $column) {
            if ($column === 'AR') {
                $formula = sprintf('=IF(M%d=0, 0, Z%d/M%d)', $targetRow, $targetRow, $targetRow);
            } elseif ($column === 'AS') {
                $formula = sprintf('=IF(Z%d=0, 0, AM%d/Z%d)', $targetRow, $targetRow, $targetRow);
            } else {
                $formula = sprintf('=SUM(%s%d:%s%d)', $column, $startRow, $column, $endRow);
            }

            $this->applyFormula($sheet, $column, $targetRow, $formula);
        }
    }

    /**
     * @param  array<int, int|string>  $sourceRows
     */
    public function writeTotalFromRows(Worksheet $sheet, array $sourceRows, int $targetRow): void
    {
        foreach ($this->columns as $column) {
            if ($column === 'AR') {
                $formula = sprintf('=IF(M%d=0, 0, Z%d/M%d)', $targetRow, $targetRow, $targetRow);
            } elseif ($column === 'AS') {
                $formula = sprintf('=IF(Z%d=0, 0, AM%d/Z%d)', $targetRow, $targetRow, $targetRow);
            } else {
                $sumParts = array_map(fn (int|string $row): string => $column.$row, $sourceRows);
                $formula = '=SUM('.implode(',', $sumParts).')';
            }

            $this->applyFormula($sheet, $column, $targetRow, $formula);
        }
    }

    private function applyFormula(Worksheet $sheet, string $col, int $row, string $formula): void
    {
        $cell = sprintf('%s%d', $col, $row);
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
