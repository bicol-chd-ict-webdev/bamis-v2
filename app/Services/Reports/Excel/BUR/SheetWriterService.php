<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use Brick\Math\BigDecimal;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class SheetWriterService
{
    public function __construct(
        private ValueBuilderService $valueBuilderService,
        private FormulaBuilder $formulas
    ) {}

    public function writeRecapitulationGrandTotal(Worksheet $sheet, string $groupType, int $row, array $totals): void
    {
        $this->writeTotals($sheet, $groupType, $row,
            fn ($col): string => $this->formulas->add($this->calculateGrandTotal($totals, $col))
        );
    }

    public function writeGrandTotalByAllotmentClass(Worksheet $sheet, string $groupType, int $row, array $rows): void
    {
        $this->writeTotals($sheet, $groupType, $row,
            fn ($col): string => $this->formulas->add($this->calculateGrandTotal($rows, $col))
        );
    }

    public function writeGrandTotal(Worksheet $sheet, string $groupType, int $row, array $rows): void
    {
        $this->writeTotals($sheet, $groupType, $row,
            fn ($col): string => $this->formulas->add($this->calculateGrandTotal($rows, $col))
        );
    }

    public function writeDivisionTotal(Worksheet $sheet, string $groupType, int $row, int $start, int $end): void
    {
        $this->writeTotals($sheet, $groupType, $row,
            fn ($col): string => $this->formulas->sum("{$col}{$start}", "{$col}{$end}")
        );
    }

    public function writeSectionSubTotals(Worksheet $sheet, string $groupType, int $row, int $start, int $end): void
    {
        $this->writeTotals($sheet, $groupType, $row,
            fn ($col): string => $this->formulas->sum("{$col}{$start}", "{$col}{$end}")
        );
    }

    public function writeSectionPerAllotmentClassTotals(Worksheet $sheet, string $groupType, int $row, array $allotment): void
    {
        $columns = ColumnMap::MAP[$groupType];
        $values = $this->valueBuilderService->build(
            $groupType,
            $row,
            fn ($type): array => [
                $allotment[$groupType]['allotment'] ?? BigDecimal::of(0),
                $allotment[$groupType]['obligation'] ?? BigDecimal::of(0),
                $allotment[$groupType]['disbursement'] ?? BigDecimal::of(0),
            ]
        );

        $this->writeSubtotals($sheet, $columns, $row, $values);
    }

    public function writeDivisionTotalByAllotmentClass(Worksheet $sheet, string $groupType, int $row, string $criteriaCell, int $startRow, int $endRow): void
    {
        $columns = ColumnMap::MAP[$groupType];
        $values = $this->valueBuilderService->build(
            $groupType,
            $row,
            fn (): array => [
                $this->formulas->sumIf('D', $criteriaCell, $columns[0], $startRow, $endRow),
                $this->formulas->sumIf('D', $criteriaCell, $columns[1], $startRow, $endRow),
                $this->formulas->sumIf('D', $criteriaCell, $columns[2], $startRow, $endRow),
            ]
        );

        $this->writeSubtotals($sheet, $columns, $row, $values);
    }

    private function writeTotals(Worksheet $sheet, string $groupType, int $row, callable $formulaBuilder): void
    {
        $columns = ColumnMap::MAP[$groupType];
        $values = [
            $formulaBuilder($columns[0]),
            $formulaBuilder($columns[1]),
            $formulaBuilder($columns[2]),
        ];

        $this->writeSubtotals($sheet, $columns, $row, $values);
    }

    private function writeSubtotals(Worksheet $sheet, array $columns, int $row, array $values): void
    {
        [$allotment, $obligation, $disbursement] = $values;

        $sheet->setCellValue("{$columns[0]}{$row}", $allotment);
        $sheet->setCellValue("{$columns[1]}{$row}", $obligation);
        $sheet->setCellValue("{$columns[2]}{$row}", $disbursement);

        $sheet->setCellValue("{$columns[3]}{$row}", $this->formulas->subtract("{$columns[0]}{$row}", "{$columns[1]}{$row}"));
        $sheet->setCellValue("{$columns[4]}{$row}", $this->formulas->subtract("{$columns[1]}{$row}", "{$columns[2]}{$row}"));
        $sheet->setCellValue("{$columns[5]}{$row}", $this->formulas->percentage("{$columns[1]}{$row}", "{$columns[0]}{$row}"));
        $sheet->setCellValue("{$columns[6]}{$row}", $this->formulas->percentage("{$columns[2]}{$row}", "{$columns[1]}{$row}"));
    }

    private function calculateGrandTotal(array $rows, string $column): string
    {
        return implode('+', array_map(fn ($r): string => "{$column}{$r}", $rows));
    }
}
