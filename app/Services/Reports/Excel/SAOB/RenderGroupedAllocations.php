<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB;

use App\Services\Reports\Excel\SAOB\AppropriationSource\AppropriationSourceRendererService;
use App\Services\Reports\Excel\SAOB\LineItem\LineItemSheetRendererService;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class RenderGroupedAllocations
{
    public function render(
        Worksheet $sheet,
        array $groupedAllocations,
        array $allAllotmentClasses,
        int &$row,
        array &$allotmentRowMap,
        LineItemSheetRendererService $lineItemSheetRendererService,
        LabelCodeRowRendererService $labelCodeRowRendererService,
        SheetTotalWriterService $sheetTotalWriterService,
        AppropriationSourceRendererService $appropriationSourceRendererService,
    ): void {
        foreach ($groupedAllocations as $groupKey => $groupCollection) {
            $groupKeyRow = $row;
            $textColor = in_array($groupKey, ['I. NEW APPROPRIATION (CURRENT)', 'I. NEW APPROPRIATION (CONAP)'], true)
                ? 'FF0070C0'
                : 'FF0000';

            // ===== main heading =====
            $sheet->setCellValue("B{$row}", $groupKey);
            $sheet->getStyle("B{$row}")
                ->getFont()
                ->setBold(true)
                ->getColor()->setARGB($textColor);
            $row++;

            // ===== check for direct line items =====
            $lineItemTotalRows = [];
            if (isset($groupCollection['Line Item'])) {
                $lineItems = $groupCollection['Line Item'];
                $lineItemSheetRendererService->render($sheet, $lineItems, $row, $lineItemTotalRows);
            } elseif (! empty($groupCollection)) {
                // ===== grouped items (e.g., I. GENERAL..., II. SUPPORT TO OPERATION...) =====
                foreach ($groupCollection as $subKey => $subCollection) {
                    $parts = explode('–', (string) $subKey);
                    $label = mb_trim($parts[0] ?? '');
                    $code = mb_trim($parts[1] ?? '');

                    // Print section label + code
                    $labelCodeRowRendererService->render($sheet, $label, $code, $row, '002060');

                    if ($label === 'III. OPERATIONS') {
                        $lineItemTotalRows = [];
                        foreach ($subCollection as $pclassKey => $programs) {
                            $parts = explode('-', (string) $pclassKey, 2);
                            $pclassLabel = mb_trim($parts[0] ?? '');
                            $pclassCode = mb_trim($parts[1] ?? '');

                            $labelCodeRowRendererService->render($sheet, $pclassLabel, $pclassCode, $row);

                            foreach ($programs as $programKey => $programData) {
                                $parts = explode('-', (string) $programKey, 2);
                                $progLabel = mb_trim($parts[0] ?? '');
                                $progCode = mb_trim($parts[1] ?? '');

                                // Print Program
                                $labelCodeRowRendererService->render($sheet, $progLabel, $progCode, $row);

                                foreach ($programData as $subKey => $lineItems) {
                                    if ($subKey === 'Line Item') {
                                        // Handle direct Line Items under the Program
                                        $lineItemSheetRendererService->render($sheet, $lineItems, $row, $lineItemTotalRows);
                                    } else {
                                        // === Subprogram exists ===
                                        $pos = mb_strrpos((string) $subKey, ' - ');
                                        $subLabel = $pos !== false ? mb_substr((string) $subKey, 0, $pos) : $subKey;
                                        $subCode = $pos !== false ? mb_substr((string) $subKey, $pos + 3) : '';

                                        $labelCodeRowRendererService->render($sheet, $subLabel, $subCode, $row);

                                        // Handle line items under subprogram
                                        $lineItems = $lineItems['Line Item'] ?? [];
                                        $lineItemSheetRendererService->render($sheet, $lineItems, $row, $lineItemTotalRows);
                                    }
                                }
                            }
                        }
                    } else {
                        $lineItems = $subCollection['Line Item'] ?? [];
                        $lineItemTotalRows = [];
                        $lineItemSheetRendererService->render($sheet, $lineItems, $row, $lineItemTotalRows);
                    }

                    if (preg_match('/^([IVXLCDM]+)\.\s*/', $label)) {
                        $cleanLabel = preg_replace('/^([IVXLCDM]+)\.\s*/', '', $label); // remove Roman numeral if present
                        $label = Str::title("Sub-total, {$cleanLabel}");
                        $sheet->setCellValue("B{$row}", $label);
                        $sheet->getStyle("B{$row}:AS{$row}")->getFont()->setBold(true)->getColor()->setARGB('FFFFFF');
                        $sheet->getStyle("B{$row}:AS{$row}")->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('3C665B');
                        $row++;

                        // Set cell values of columns F - M with the total sum of each line item per label
                        $sheetTotalWriterService->writeTotalFromRows($sheet, $lineItemTotalRows, $row - 1);
                        $row++;
                    }
                }
            } else {
                $sheet->setCellValue("C{$row}", '');
                $row++;
            }

            // Render totals per appropriation source
            $rowsByAllotment = $appropriationSourceRendererService->render($sheet, $groupKey, $allAllotmentClasses, $groupKeyRow, $row);

            // Merge into master map
            foreach ($rowsByAllotment as $class => $rows) {
                $allotmentRowMap[$class] = array_merge($allotmentRowMap[$class] ?? [], $rows);
            }
        }
    }
}
