<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AppropriationSource;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class AppropriationSourceFormulaService
{
    public function writeAllotmentClassFormula(
        Worksheet $sheet,
        int $row,
        int $startRow,
        int $endRow
    ): void {
        $criteriaCell = 'B'.$row;
        $startColIndex = Coordinate::columnIndexFromString('E');
        $endColIndex = Coordinate::columnIndexFromString('AQ');

        for ($colIndex = $startColIndex; $colIndex <= $endColIndex; $colIndex++) {
            $col = Coordinate::stringFromColumnIndex($colIndex);
            $formula = sprintf('=SUMIF($B$%d:$B$%d,%s,%s$%d:%s$%d)', $startRow, $endRow, $criteriaCell, $col, $startRow, $col, $endRow);
            $sheet->setCellValue(sprintf('%s%d', $col, $row), $formula);
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
            $sheet->setCellValue(sprintf('%s%d', $col, $row), sprintf('=SUM(%s%d:%s%d)', $col, $startRow, $col, $endRow));
        }
    }

    public function writePercentageColumns(Worksheet $sheet, int $row): void
    {
        $sheet->setCellValue('AR'.$row, sprintf('=IF(M%d=0, "", Z%d/M%d)', $row, $row, $row));
        $sheet->setCellValue('AS'.$row, sprintf('=IF(Z%d=0, "", AM%d/Z%d)', $row, $row, $row));
    }
}
