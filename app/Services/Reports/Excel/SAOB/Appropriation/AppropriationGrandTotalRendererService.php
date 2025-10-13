<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Appropriation;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class AppropriationGrandTotalRendererService
{
    public function __construct(
        private AppropriationFormatterService $formatterService,
        private AppropriationFormulaService $formulaService,
        private AppropriationRowMergerService $rowMergerService
    ) {}

    /**
     * @param  array<string, array<int>>  $currentMap
     * @param  array<string, array<int>>  $conapMap
     */
    public function render(Worksheet $sheet, array $currentMap, array $conapMap, int &$row, string $label = 'GRAND TOTAL CURRENT + CONAP'): void
    {
        $row--;
        $grandTotalRow = ++$row;
        $sheet->setCellValue("B{$grandTotalRow}", $label);
        $this->formatterService->formatHeaderRow($sheet, $grandTotalRow, '215565');

        $startCol = Coordinate::columnIndexFromString('E');
        $endCol = Coordinate::columnIndexFromString('AQ');

        $mergedMap = $this->rowMergerService->merge($currentMap, $conapMap);

        $firstSubRow = $row + 1;
        $lastSubRow = $firstSubRow + count($mergedMap) - 1;

        foreach (range($startCol, $endCol) as $colIndex) {
            $col = Coordinate::stringFromColumnIndex($colIndex);
            $sheet->setCellValue("{$col}{$grandTotalRow}", "=SUM({$col}{$firstSubRow}:{$col}{$lastSubRow})");
        }

        $this->formulaService->write($sheet, $grandTotalRow);

        /** @var array<int> $rows */
        foreach ($mergedMap as $className => $rows) {
            $row++;
            $sheet->setCellValue("B{$row}", $className);
            $this->formatterService->formatHeaderRow($sheet, $row, '215565');

            foreach (range($startCol, $endCol) as $colIndex) {
                $col = Coordinate::stringFromColumnIndex($colIndex);
                /** @var array<int> $rows */
                $formula = '='.implode('+', array_map(fn (int $r): string => "{$col}{$r}", $rows));
                $sheet->setCellValue("{$col}{$row}", $formula);
            }

            $this->formulaService->write($sheet, $row);
        }
    }
}
