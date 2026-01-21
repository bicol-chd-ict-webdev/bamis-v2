<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Appropriation;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class AppropriationTotalRendererService
{
    public function __construct(
        private AppropriationFormatterService $formatterService,
        private AppropriationFormulaService $formulaService,
    ) {}

    /**
     * @param  array<string, array<int, int|string>>  $allotmentRowMap
     */
    public function render(Worksheet $sheet, array $allotmentRowMap, int &$row, string $label): void
    {
        $row--;
        $totalLabelRow = ++$row;
        $sheet->setCellValue('B'.$totalLabelRow, 'TOTAL, '.$label);
        $this->formatterService->formatHeaderRow($sheet, $totalLabelRow);

        $startCol = Coordinate::columnIndexFromString('E');
        $endCol = Coordinate::columnIndexFromString('AQ');

        /** @var array<int, int|string> $subtotalRows */
        $subtotalRows = [];

        foreach ($allotmentRowMap as $className => $rows) {
            /** @var array<int, int|string> $rows */
            $row++;
            $sheet->setCellValue('B'.$row, $className);
            $this->formatterService->formatHeaderRow($sheet, $row);

            foreach (range($startCol, $endCol) as $colIndex) {
                $col = Coordinate::stringFromColumnIndex($colIndex);
                $formula = '='.implode('+', array_map(fn (int|string $r): string => sprintf('%s%s', $col, (string) $r), $rows));
                $sheet->setCellValue(sprintf('%s%d', $col, $row), $formula);
            }

            $this->formulaService->write($sheet, $row);
            $subtotalRows[] = $row;
        }

        if ($subtotalRows !== []) {
            /** @var list<int> $numericSubtotalRows */
            $numericSubtotalRows = array_filter($subtotalRows, is_int(...));
            if ($numericSubtotalRows === []) {
                $row++;

                return;
            }

            $minRow = min($numericSubtotalRows);
            $maxRow = max($numericSubtotalRows);

            foreach (range($startCol, $endCol) as $colIndex) {
                $col = Coordinate::stringFromColumnIndex($colIndex);
                $sheet->setCellValue(sprintf('%s%d', $col, $totalLabelRow), sprintf('=SUM(%s%d:%s%d)', $col, $minRow, $col, $maxRow));
            }

            $this->formulaService->write($sheet, $totalLabelRow);
        }

        $row++;
    }
}
