<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB;

use App\Services\Reports\Excel\SAOB\AppropriationSource\AppropriationSourceRendererService;
use App\Services\Reports\Excel\SAOB\LineItem\LineItemSheetRendererService;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type SAOBSourceData from AllocationGrouper
 * @phpstan-import-type SAOMLineItemData from AllocationGrouper
 */
final class RenderGroupedAllocations
{
    /**
     * @param  array<string, array<string, mixed>>  $groupedAllocations
     * @param  array<int, string>  $allAllotmentClasses
     * @param  array<string, array<int, int|string>>  $allotmentRowMap
     */
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
            $sheet->setCellValue('B'.$row, $groupKey);
            $sheet->getStyle('B'.$row)
                ->getFont()
                ->setBold(true)
                ->getColor()->setARGB($textColor);
            $row++;

            // ===== check for direct line items =====
            /** @var array<int, int|string> $lineItemTotalRows */
            $lineItemTotalRows = [];
            if (isset($groupCollection['Line Item'])) {
                /** @var array<int, SAOMLineItemData> $lineItems */
                $lineItems = $groupCollection['Line Item'];
                $lineItemSheetRendererService->render($sheet, $lineItems, $row, $lineItemTotalRows);
            } elseif (! empty($groupCollection)) {
                // ===== grouped items (e.g., I. GENERAL..., II. SUPPORT TO OPERATION...) =====
                foreach ($groupCollection as $subKey => $subCollection) {
                    /** @var array<string, mixed> $subCollection */
                    $parts = explode('–', (string) $subKey);
                    $label = mb_trim($parts[0]);
                    $code = mb_trim($parts[1] ?? '');

                    // Print section label + code
                    $labelCodeRowRendererService->render($sheet, $label, $code, $row, '002060');

                    if ($label === 'III. OPERATIONS') {
                        $lineItemTotalRows = [];
                        /** @phpstan-var array<string, array<string, array<string, array{"Line Item": array<int, SAOMLineItemData>}>>> $operationDetails */
                        $operationDetails = $subCollection;
                        foreach ($operationDetails as $pclassKey => $programs) {
                            $parts = explode('-', (string) $pclassKey, 2);
                            $pclassLabel = mb_trim($parts[0]);
                            $pclassCode = mb_trim($parts[1] ?? '');

                            $labelCodeRowRendererService->render($sheet, $pclassLabel, $pclassCode, $row);

                            foreach ($programs as $programKey => $programData) {
                                $parts = explode('-', (string) $programKey, 2);
                                $progLabel = mb_trim($parts[0]);
                                $progCode = mb_trim($parts[1] ?? '');

                                // Print Program
                                $labelCodeRowRendererService->render($sheet, $progLabel, $progCode, $row);

                                /** @phpstan-var array<string, array{"Line Item": array<int, SAOMLineItemData>} | array<int, SAOMLineItemData>> $programDetails */
                                $programDetails = $programData;
                                foreach ($programDetails as $sKey => $lItems) {
                                    if ($sKey === 'Line Item') {
                                        // Handle direct Line Items under the Program
                                        /** @var array<int, SAOMLineItemData> $lItems */
                                        $lineItemSheetRendererService->render($sheet, $lItems, $row, $lineItemTotalRows);
                                    } else {
                                        // === Subprogram exists ===
                                        $pos = mb_strrpos((string) $sKey, ' - ');
                                        $subLabel = $pos !== false ? mb_substr((string) $sKey, 0, $pos) : (string) $sKey;
                                        $subCode = $pos !== false ? mb_substr((string) $sKey, $pos + 3) : '';

                                        $labelCodeRowRendererService->render($sheet, $subLabel, $subCode, $row);

                                        // Handle line items under subprogram
                                        /** @phpstan-var array{"Line Item": array<int, SAOMLineItemData>} $subprogramData */
                                        $subprogramData = $lItems;
                                        $lItems = $subprogramData['Line Item'];
                                        $lineItemSheetRendererService->render($sheet, $lItems, $row, $lineItemTotalRows);
                                    }
                                }
                            }
                        }
                    } else {
                        /** @phpstan-var array{"Line Item"?: array<int, SAOMLineItemData>} $subData */
                        $subData = $subCollection;
                        $lineItems = $subData['Line Item'] ?? [];
                        $lineItemTotalRows = [];
                        $lineItemSheetRendererService->render($sheet, $lineItems, $row, $lineItemTotalRows);
                    }

                    if (preg_match('/^([IVXLCDM]+)\.\s*/', $label)) {
                        $cleanLabel = preg_replace('/^([IVXLCDM]+)\.\s*/', '', $label); // remove Roman numeral if present
                        $label = Str::title('Sub-total, '.$cleanLabel);
                        $sheet->setCellValue('B'.$row, $label);
                        $sheet->getStyle(sprintf('B%d:AS%d', $row, $row))->getFont()->setBold(true)->getColor()->setARGB('FFFFFF');
                        $sheet->getStyle(sprintf('B%d:AS%d', $row, $row))->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('3C665B');
                        $row++;

                        // Set cell values of columns F - M with the total sum of each line item per label
                        $sheetTotalWriterService->writeTotalFromRows($sheet, $lineItemTotalRows, $row - 1);
                        $row++;
                    }
                }
            } else {
                $sheet->setCellValue('C'.$row, '');
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
