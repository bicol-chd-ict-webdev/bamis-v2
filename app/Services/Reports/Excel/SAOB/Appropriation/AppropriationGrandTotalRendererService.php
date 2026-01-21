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
     * @param  array<string, array<int, int|string>>  $currentMap
     * @param  array<string, array<int, int|string>>  $conapMap
     */
    public function render(Worksheet $sheet, array $currentMap, array $conapMap, int &$row, string $label = 'GRAND TOTAL CURRENT + CONAP'): void
    {
        $row--;
        $grandTotalRow = ++$row;
        $sheet->setCellValue('B'.$grandTotalRow, $label);
        $this->formatterService->formatHeaderRow($sheet, $grandTotalRow, '215565');

        $startCol = Coordinate::columnIndexFromString('E');
        $endCol = Coordinate::columnIndexFromString('AQ');

        $mergedMap = $this->rowMergerService->merge($currentMap, $conapMap);

        $firstSubRow = $row + 1;
        $lastSubRow = $firstSubRow + count($mergedMap) - 1;

        foreach (range($startCol, $endCol) as $colIndex) {
            $col = Coordinate::stringFromColumnIndex($colIndex);
            $sheet->setCellValue(sprintf('%s%d', $col, $grandTotalRow), sprintf('=SUM(%s%d:%s%d)', $col, $firstSubRow, $col, $lastSubRow));
        }

        $this->formulaService->write($sheet, $grandTotalRow);

        /** @var array<string, array<int, int|string>> $mergedMap */
        foreach ($mergedMap as $className => $rows) {
            $row++;
            $sheet->setCellValue('B'.$row, $className);
            $this->formatterService->formatHeaderRow($sheet, $row, '215565');

            foreach (range($startCol, $endCol) as $colIndex) {
                $col = Coordinate::stringFromColumnIndex($colIndex);
                $formula = '='.implode('+', array_map(fn (int|string $r): string => sprintf('%s%s', $col, (string) $r), $rows));
                $sheet->setCellValue(sprintf('%s%d', $col, $row), $formula);
            }

            $this->formulaService->write($sheet, $row);
        }
    }
}
