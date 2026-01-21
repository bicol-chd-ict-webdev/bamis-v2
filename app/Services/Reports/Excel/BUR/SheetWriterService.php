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

    /**
     * @param  array<int, int>  $totals
     */
    public function writeRecapitulationGrandTotal(Worksheet $sheet, string $groupType, int $row, array $totals): void
    {
        $this->writeTotals(
            $sheet,
            $groupType,
            $row,
            fn (string $col): string => $this->formulas->add($this->calculateGrandTotal($totals, $col))
        );
    }

    /**
     * @param  array<int, int>  $rows
     */
    public function writeGrandTotalByAllotmentClass(Worksheet $sheet, string $groupType, int $row, array $rows): void
    {
        $this->writeTotals(
            $sheet,
            $groupType,
            $row,
            fn (string $col): string => $this->formulas->add($this->calculateGrandTotal($rows, $col))
        );
    }

    /**
     * @param  array<int, int>  $rows
     */
    public function writeGrandTotal(Worksheet $sheet, string $groupType, int $row, array $rows): void
    {
        $this->writeTotals(
            $sheet,
            $groupType,
            $row,
            fn (string $col): string => $this->formulas->add($this->calculateGrandTotal($rows, $col))
        );
    }

    public function writeDivisionTotal(Worksheet $sheet, string $groupType, int $row, int $start, int $end): void
    {
        $this->writeTotals(
            $sheet,
            $groupType,
            $row,
            fn (string $col): string => $this->formulas->sum(sprintf('%s%d', $col, $start), sprintf('%s%d', $col, $end))
        );
    }

    public function writeSectionSubTotals(Worksheet $sheet, string $groupType, int $row, int $start, int $end): void
    {
        $this->writeTotals(
            $sheet,
            $groupType,
            $row,
            fn (string $col): string => $this->formulas->sum(sprintf('%s%d', $col, $start), sprintf('%s%d', $col, $end))
        );
    }

    /**
     * @param array<string, array{
     *     allotment: BigDecimal,
     *     obligation: BigDecimal,
     *     disbursement: BigDecimal
     * }> $allotment
     */
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

    /**
     * @param  (callable(string): string)  $formulaBuilder
     */
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

    /**
     * @param  array<int, string>  $columns
     * @param  array<int, mixed>  $values
     */
    private function writeSubtotals(Worksheet $sheet, array $columns, int $row, array $values): void
    {
        [$allotment, $obligation, $disbursement] = $values;

        $sheet->setCellValue(sprintf('%s%d', $columns[0], $row), $allotment);
        $sheet->setCellValue(sprintf('%s%d', $columns[1], $row), $obligation);
        $sheet->setCellValue(sprintf('%s%d', $columns[2], $row), $disbursement);

        $sheet->setCellValue(sprintf('%s%d', $columns[3], $row), $this->formulas->subtract(sprintf('%s%d', $columns[0], $row), sprintf('%s%d', $columns[1], $row)));
        $sheet->setCellValue(sprintf('%s%d', $columns[4], $row), $this->formulas->subtract(sprintf('%s%d', $columns[1], $row), sprintf('%s%d', $columns[2], $row)));
        $sheet->setCellValue(sprintf('%s%d', $columns[5], $row), $this->formulas->percentage(sprintf('%s%d', $columns[1], $row), sprintf('%s%d', $columns[0], $row)));
        $sheet->setCellValue(sprintf('%s%d', $columns[6], $row), $this->formulas->percentage(sprintf('%s%d', $columns[2], $row), sprintf('%s%d', $columns[1], $row)));
    }

    /**
     * @param  array<int, int>  $rows
     */
    private function calculateGrandTotal(array $rows, string $column): string
    {
        if ($rows === []) {
            return '0';
        }

        return implode('+', array_map(fn ($r): string => $column.$r, $rows));
    }
}
