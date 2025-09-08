<?php

declare(strict_types=1);

namespace App\Services\Excel\AppropriationSource;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AppropriationSourceFormulaService
{
    public function writeAllotmentClassFormula(
        Worksheet $sheet,
        int $row,
        int $startRow,
        int $endRow
    ): void {
        $criteriaCell = "B{$row}";
        $startColIndex = Coordinate::columnIndexFromString('E');
        $endColIndex = Coordinate::columnIndexFromString('AQ');

        for ($colIndex = $startColIndex; $colIndex <= $endColIndex; $colIndex++) {
            $col = Coordinate::stringFromColumnIndex($colIndex);
            $formula = "=SUMIF(\$B\${$startRow}:\$B\${$endRow},{$criteriaCell},{$col}\${$startRow}:{$col}\${$endRow})";
            $sheet->setCellValue("{$col}{$row}", $formula);
        }
    }

    public function writeTotalRowFormula(
        Worksheet $sheet,
        int $row,
        int $startRow,
        int $endRow
    ): void {
        for ($colIndex = Coordinate::columnIndexFromString('E'); $colIndex <= Coordinate::columnIndexFromString('AQ'); $colIndex++) {
            $col = Coordinate::stringFromColumnIndex($colIndex);
            $sheet->setCellValue("{$col}{$row}", "=SUM({$col}{$startRow}:{$col}{$endRow})");
        }
    }

    public function writePercentageColumns(Worksheet $sheet, int $row): void
    {
        $sheet->setCellValue("AR{$row}", "=IF(M{$row}=0, \"\", Z{$row}/M{$row})");
        $sheet->setCellValue("AS{$row}", "=IF(Z{$row}=0, \"\", AM{$row}/Z{$row})");
    }
}
