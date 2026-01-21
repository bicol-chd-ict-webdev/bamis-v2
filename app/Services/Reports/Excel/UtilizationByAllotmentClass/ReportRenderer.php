<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type UtilizationRow from UtilizationByAllotmentClassDataBuilder
 */
final readonly class ReportRenderer
{
    public function __construct(private ReportStyler $styler) {}

    /**
     * @param  array<string, array<int, UtilizationRow>>  $data
     */
    public function renderPS(Worksheet $sheet, int $startRow, array $data): int
    {
        $row = $startRow;

        foreach ($data as $category => $items) {
            $sheet->setCellValue('A'.$row, $category);
            $sheet->getStyle('A'.$row)->getFont()->setBold(true);

            $firstRow = $row + 1;
            foreach ($items as $utilization) {
                $this->renderDataRow($sheet, $row, $utilization);
                $row++;
            }

            $lastRow = $row;

            $this->renderAllotmentClassTotal($sheet, $row, 'Total PS including RLIP', $firstRow, $lastRow);
            $row++;
        }

        return $row;
    }

    /**
     * @param  array<string, array<int, UtilizationRow>>  $data
     */
    public function renderMooe(Worksheet $sheet, int $startRow, array $data): int
    {
        $row = $startRow;

        foreach ($data as $category => $items) {
            $sheet->setCellValue('A'.$row, $category);
            $sheet->getStyle('A'.$row)->getFont()->setBold(true);

            $subtotalRows = [];
            $firstRow = $row + 1;
            $groupedItems = $this->groupByAcronym($items);

            foreach ($groupedItems as $utilization) {
                $this->renderDataRow($sheet, $row, $utilization);

                $acronym = mb_trim(mb_strtoupper((string) $utilization['line_item_acronym']));
                if ($acronym === 'MAIP CURRENT') {
                    $row = $this->insertSubTotal($sheet, $row, $firstRow, 'Sub-Total MOOE- Current');
                    $subtotalRows[] = $row;
                } elseif ($acronym === 'MAIP CONAP') {
                    $row = $this->insertSubtotal($sheet, $row, $subtotalRows[0] + 1, 'Sub-Total MOOE- CONAP');
                    $subtotalRows[] = $row;
                }

                $row++;
            }

            $this->renderTotalFromSubtotals($sheet, $row, 'Total MOOE', $subtotalRows);
            $row++;
        }

        return $row - 1;
    }

    /**
     * @param  array<string, array<string, array<int, UtilizationRow>>>  $data
     */
    public function renderCo(Worksheet $sheet, int $startRow, array $data): int
    {
        $row = $startRow;

        foreach ($data as $category => $types) {
            $sheet->setCellValue('A'.$row, $category);
            $sheet->getStyle('A'.$row)->getFont()->setBold(true);
            $row++;

            $subtotalRows = [];

            foreach ($types as $type => $items) {
                $sheet->setCellValue('B'.$row, $type);

                $firstRow = $row;
                foreach ($items as $item) {
                    $this->renderDataRow($sheet, $row, $item, true);

                    $acronym = mb_trim(mb_strtoupper((string) $item['line_item_acronym']));
                    if ($acronym === 'MOTOR VEHICLES' && $type === 'HFEP CURRENT') {
                        $row++;
                        $row = $this->insertSubtotal($sheet, $row, $firstRow, 'Sub-Total CO - CURRENT');
                        $subtotalRows[] = $row;
                    } elseif ($acronym === 'MOTOR VEHICLES' && $type === 'HFEP CONAP') {
                        $row++;
                        $row = $this->insertSubtotal($sheet, $row, $firstRow, 'Sub-Total CO - CONAP');
                        $subtotalRows[] = $row;
                    }

                    $row++;
                }
            }

            $this->renderTotalFromSubtotals($sheet, $row, 'Total Capital Outlays', $subtotalRows);
            $row++;
        }

        return $row - 1;
    }

    /**
     * @param  array<int, UtilizationRow>  $items
     * @return array<int, UtilizationRow>
     */
    private function groupByAcronym(array $items): array
    {
        $grouped = [];

        foreach ($items as $item) {
            $acronym = mb_trim(mb_strtoupper((string) $item['line_item_acronym']));

            if (! isset($grouped[$acronym])) {
                $grouped[$acronym] = $item;
            } else {
                // SUM all numeric fields (adjust based on your columns)
                $grouped[$acronym]['allotment'] = (string) ((float) $grouped[$acronym]['allotment'] + (float) $item['allotment']);
                $grouped[$acronym]['obligation'] = (string) ((float) $grouped[$acronym]['obligation'] + (float) $item['obligation']);
                $grouped[$acronym]['unobligated_balance'] = (string) ((float) $grouped[$acronym]['unobligated_balance'] + (float) $item['unobligated_balance']);
                $grouped[$acronym]['disbursement'] = (string) ((float) $grouped[$acronym]['disbursement'] + (float) $item['disbursement']);
                $grouped[$acronym]['unpaid_obligation'] = (string) ((float) $grouped[$acronym]['unpaid_obligation'] + (float) $item['unpaid_obligation']);
            }
        }

        return array_values($grouped); // reset keys for foreach
    }

    /**
     * @param  UtilizationRow  $data
     */
    private function renderDataRow(Worksheet $sheet, int $row, array $data, bool $tabbed = false): void
    {
        $row++;

        $sheet->setCellValue('B'.$row, $tabbed ? '   '.$data['line_item_acronym'] : $data['line_item_acronym']);
        $sheet->setCellValue('C'.$row, $data['allotment']);
        $sheet->setCellValue('D'.$row, $data['obligation']);
        $sheet->setCellValue('E'.$row, $data['unobligated_balance']);
        $sheet->setCellValue('G'.$row, $data['disbursement']);
        $sheet->setCellValue('H'.$row, $data['unpaid_obligation']);

        $formulas = new FormulaBuilder($row);
        $formulas->setPercentageFormulas($sheet);
    }

    private function renderAllotmentClassTotal(Worksheet $sheet, int $row, string $label, int $firstRow, int $lastRow): void
    {
        $row++;

        $sheet->setCellValue('A'.$row, $label);
        $sheet->setCellValue('C'.$row, sprintf('=SUM(C%d:C%d)', $firstRow, $lastRow));
        $sheet->setCellValue('D'.$row, sprintf('=SUM(D%d:D%d)', $firstRow, $lastRow));
        $sheet->setCellValue('E'.$row, sprintf('=SUM(E%d:E%d)', $firstRow, $lastRow));
        $sheet->setCellValue('G'.$row, sprintf('=SUM(G%d:G%d)', $firstRow, $lastRow));
        $sheet->setCellValue('H'.$row, sprintf('=SUM(H%d:H%d)', $firstRow, $lastRow));

        $formulas = new FormulaBuilder($row);
        $formulas->setSumFormulas($sheet, $firstRow, $lastRow);

        $this->styler->applyTotalRowStyle($sheet, sprintf('A%d:I%d', $row, $row));
    }

    private function insertSubTotal(Worksheet $sheet, int $currentRow, int $firstRow, string $label): int
    {
        $lastRow = $currentRow;
        $currentRow++;
        $sheet->insertNewRowBefore($currentRow, 1);

        $sheet->setCellValue('B'.$currentRow, '   '.$label);

        $formulas = new FormulaBuilder($currentRow);
        $formulas->setSumFormulas($sheet, $firstRow, $lastRow);

        $this->styler->applySubtotalStyle($sheet, sprintf('B%d:I%d', $currentRow, $currentRow));

        return $currentRow;
    }

    /**
     * @param  array<int, int>  $subtotalRows
     */
    private function renderTotalFromSubtotals(Worksheet $sheet, int $row, string $label, array $subtotalRows): void
    {
        if ($subtotalRows === []) {
            return;
        }

        $sheet->setCellValue('A'.$row, $label);
        $sheet->mergeCells(sprintf('A%d:B%d', $row, $row));

        $formulas = new FormulaBuilder($row);
        $formulas->setSumFormulasFromRows($sheet, $subtotalRows);

        $this->styler->applyTotalRowStyle($sheet, sprintf('A%d:I%d', $row, $row));
    }
}
