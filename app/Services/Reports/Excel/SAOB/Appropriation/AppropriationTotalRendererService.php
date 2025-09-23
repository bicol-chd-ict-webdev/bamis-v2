<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Appropriation;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AppropriationTotalRendererService
{
    public function __construct(
        private readonly AppropriationFormatterService $formatterService,
        private readonly AppropriationFormulaService $formulaService,
    ) {}

    /**
     * @param  array<string, array<int>>  $allotmentRowMap
     */
    public function render(Worksheet $sheet, array $allotmentRowMap, int &$row, string $label): void
    {
        $row--;
        $totalLabelRow = ++$row;
        $sheet->setCellValue("B{$totalLabelRow}", "TOTAL, {$label}");
        $this->formatterService->formatHeaderRow($sheet, $totalLabelRow);

        $startCol = Coordinate::columnIndexFromString('E');
        $endCol = Coordinate::columnIndexFromString('AQ');

        $subtotalRows = [];

        /** @var array<int> $rows */
        foreach ($allotmentRowMap as $className => $rows) {
            $row++;
            $sheet->setCellValue("B{$row}", $className);
            $this->formatterService->formatHeaderRow($sheet, $row);

            foreach (range($startCol, $endCol) as $colIndex) {
                $col = Coordinate::stringFromColumnIndex($colIndex);
                $formula = '='.implode('+', array_map(fn (int $r): string => "{$col}{$r}", $rows));
                $sheet->setCellValue("{$col}{$row}", $formula);
            }

            $this->formulaService->write($sheet, $row);
            $subtotalRows[] = $row;
        }

        if ($subtotalRows !== []) {
            $minRow = min($subtotalRows);
            $maxRow = max($subtotalRows);

            foreach (range($startCol, $endCol) as $colIndex) {
                $col = Coordinate::stringFromColumnIndex($colIndex);
                $sheet->setCellValue("{$col}{$totalLabelRow}", "=SUM({$col}{$minRow}:{$col}{$maxRow})");
            }

            $this->formulaService->write($sheet, $totalLabelRow);
        }

        $row++;
    }
}
