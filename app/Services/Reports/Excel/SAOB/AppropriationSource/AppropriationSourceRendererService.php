<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AppropriationSource;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AppropriationSourceRendererService
{
    public function __construct(
        private readonly AppropriationSourceStylerService $stylerService,
        private readonly AppropriationSourceFormulaService $formulaService
    ) {}

    /**
     * @param  array<int, string>  $allAllotmentClasses
     * @return non-empty-list<int>[]
     */
    public function render(
        Worksheet $sheet,
        string $groupKey,
        array $allAllotmentClasses,
        int $groupKeyRow,
        int &$row
    ): array {
        $classRowMap = [];

        $cleanGroupKey = (string) preg_replace([
            '/^([IVXLCDM]+)\.\s*/',
            '/\s*\(CURRENT\)$/i',
            '/\s*\(CONAP\)$/i',
        ], '', $groupKey);

        $totalGroupLabelRow = $row;
        $this->stylerService->applyHeaderStyle($sheet, $totalGroupLabelRow, "TOTAL, {$cleanGroupKey}");

        $row++;
        $startAllotmentRow = $row;

        foreach ($allAllotmentClasses as $className) {
            $currentRow = $row;
            $classRowMap[$className][] = $currentRow;

            $this->stylerService->applyHeaderStyle($sheet, $currentRow, $className);

            $startDataRow = $groupKeyRow + 1;
            $endDataRow = $currentRow - 1;

            $this->formulaService->writeAllotmentClassFormula($sheet, $currentRow, $startDataRow, $endDataRow);
            $this->formulaService->writePercentageColumns($sheet, $currentRow);
            $this->stylerService->applyPercentageStyle($sheet, $currentRow);

            $row++;
        }

        $endAllotmentRow = $row - 1;

        $this->formulaService->writeTotalRowFormula($sheet, $totalGroupLabelRow, $startAllotmentRow, $endAllotmentRow);
        $this->formulaService->writePercentageColumns($sheet, $totalGroupLabelRow);
        $this->stylerService->applyPercentageStyle($sheet, $totalGroupLabelRow);

        $row++;

        return $classRowMap;
    }
}
