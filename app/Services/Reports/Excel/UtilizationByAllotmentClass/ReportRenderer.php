<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

final readonly class ReportRenderer
{
    public function __construct(private ReportStyler $styler) {}

    public function renderPS($sheet, int $startRow, array $data): int
    {
        $row = $startRow;

        foreach ($data as $category => $items) {
            $sheet->setCellValue("A{$row}", $category);
            $sheet->getStyle("A{$row}")->getFont()->setBold(true);

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

    public function renderMooe($sheet, int $startRow, array $data): int
    {
        $row = $startRow;

        foreach ($data as $category => $items) {
            $sheet->setCellValue("A{$row}", $category);
            $sheet->getStyle("A{$row}")->getFont()->setBold(true);

            $subtotalRows = [];
            $firstRow = $row + 1;
            $groupedItems = $this->groupByAcronym($items);

            foreach ($groupedItems as $utilization) {
                $this->renderDataRow($sheet, $row, $utilization);

                $acronym = trim(mb_strtoupper((string) $utilization['line_item_acronym']));
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

    public function renderCo($sheet, int $startRow, array $data): int
    {
        $row = $startRow;

        foreach ($data as $category => $types) {
            $sheet->setCellValue("A{$row}", $category);
            $sheet->getStyle("A{$row}")->getFont()->setBold(true);
            $row++;

            $subtotalRows = [];

            foreach ($types as $type => $items) {
                $sheet->setCellValue("B{$row}", $type);

                $firstRow = $row;
                foreach ($items as $item) {
                    $this->renderDataRow($sheet, $row, $item, true);

                    $acronym = trim(mb_strtoupper((string) $item['line_item_acronym']));
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

    private function groupByAcronym(array $items): array
    {
        $grouped = [];

        foreach ($items as $item) {
            $acronym = trim(mb_strtoupper((string) $item['line_item_acronym']));

            if (! isset($grouped[$acronym])) {
                $grouped[$acronym] = $item;
            } else {
                // SUM all numeric fields (adjust based on your columns)
                $grouped[$acronym]['allotment'] += $item['allotment'] ?? 0;
                $grouped[$acronym]['obligation'] += $item['obligation'] ?? 0;
                $grouped[$acronym]['unobligated_balance'] += $item['unobligated_balance'] ?? 0;
                $grouped[$acronym]['disbursement'] += $item['disbursement'] ?? 0;
                $grouped[$acronym]['unpaid_obligation'] += $item['unpaid_obligation'] ?? 0;
            }
        }

        return array_values($grouped); // reset keys for foreach
    }

    private function renderDataRow($sheet, int $row, array $data, bool $tabbed = false): void
    {
        $row++;

        $sheet->setCellValue("B{$row}", $tabbed ? "   {$data['line_item_acronym']}" : $data['line_item_acronym']);
        $sheet->setCellValue("C{$row}", $data['allotment']);
        $sheet->setCellValue("D{$row}", $data['obligation']);
        $sheet->setCellValue("E{$row}", $data['unobligated_balance']);
        $sheet->setCellValue("G{$row}", $data['disbursement']);
        $sheet->setCellValue("H{$row}", $data['unpaid_obligation']);

        $formulas = new FormulaBuilder($row);
        $formulas->setPercentageFormulas($sheet);
    }

    private function renderAllotmentClassTotal($sheet, int $row, string $label, int $firstRow, int $lastRow): void
    {
        $row++;

        $sheet->setCellValue("A{$row}", $label);
        $sheet->setCellValue("C{$row}", "=SUM(C{$firstRow}:C{$lastRow})");
        $sheet->setCellValue("D{$row}", "=SUM(D{$firstRow}:D{$lastRow})");
        $sheet->setCellValue("E{$row}", "=SUM(E{$firstRow}:E{$lastRow})");
        $sheet->setCellValue("G{$row}", "=SUM(G{$firstRow}:G{$lastRow})");
        $sheet->setCellValue("H{$row}", "=SUM(H{$firstRow}:H{$lastRow})");

        $formulas = new FormulaBuilder($row);
        $formulas->setSumFormulas($sheet, $firstRow, $lastRow);

        $this->styler->applyTotalRowStyle($sheet, "A{$row}:I{$row}");
    }

    private function insertSubTotal($sheet, int $currentRow, int $firstRow, string $label): int
    {
        $lastRow = $currentRow;
        $currentRow++;
        $sheet->insertNewRowBefore($currentRow, 1);

        $sheet->setCellValue("B{$currentRow}", "   {$label}");

        $formulas = new FormulaBuilder($currentRow);
        $formulas->setSumFormulas($sheet, $firstRow, $lastRow);

        $this->styler->applySubtotalStyle($sheet, "B{$currentRow}:I{$currentRow}");

        return $currentRow;
    }

    private function renderTotalFromSubtotals($sheet, int $row, string $label, array $subtotalRows): void
    {
        if ($subtotalRows === []) {
            return;
        }

        $sheet->setCellValue("A{$row}", $label);
        $sheet->mergeCells("A{$row}:B{$row}");

        $formulas = new FormulaBuilder($row);
        $formulas->setSumFormulasFromRows($sheet, $subtotalRows);

        $this->styler->applyTotalRowStyle($sheet, "A{$row}:I{$row}");
    }
}
