<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use App\Enums\BURGroup;
use Carbon\CarbonImmutable;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

final readonly class BurSheetRendererService
{
    public function __construct(
        private BurHeaderRendererService $headerRenderer,
        private SheetStylerService $sheetStylerService,
        private SheetWriterService $sheetWriterService,
    ) {}

    public function render(Spreadsheet $spreadsheet, array $data, string $date): void
    {
        abort_if($data === [], 500, 'No allocation encoded yet.');

        $asOfDate = CarbonImmutable::parse($date);
        $year = $asOfDate->year;
        $formattedDate = $asOfDate->format('F d, Y');

        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('BUR by Division Section Cluster');

        $this->headerRenderer->render($sheet, $year, $formattedDate);

        $row = 7;
        $allotmentClassTotals = [
            'PS' => [],
            'MOOE' => [],
            'CO' => [],
        ];
        foreach ($data as $divisionAcronym => $sections) {
            $divisionStartRow = $row;

            $sheet->setCellValue("A{$row}", $divisionAcronym);

            $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");

            $divisionTotalByAllotmentClass = [
                'PS' => [],
                'MOOE' => [],
                'CO' => [],
            ];

            foreach ($sections['sections'] as $sectionName => $section) {
                $sheet->setCellValue("B{$row}", $sectionName);
                $sheet->setCellValue("C{$row}", $section['code']);

                $sheet->getStyle("B{$row}")->applyFromArray([
                    'alignment' => [
                        'wrapText' => true,
                    ],
                ]);

                $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");

                $sectionStartRow = $row;
                foreach ($section['allotmentClasses'] as $allotmentClassAcronym => $allotment) {
                    $sheet->setCellValue("D{$row}", $allotmentClassAcronym);

                    foreach (BURGroup::cases() as $groupType) {
                        $this->sheetWriterService->writeSectionPerAllotmentClassTotals($sheet, $groupType->value, $row, $allotment);
                        $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");
                    }

                    $row++;
                }

                // subtotal row after all allotment classes
                $sheet->setCellValue("D{$row}", 'Sub-Total');

                // use SUM from first allotment row to last allotment row
                $firstColumnCell = $sectionStartRow;
                $lastColumnCell = $row - 1;

                foreach (BURGroup::cases() as $groupType) {
                    $this->sheetWriterService->writeSectionSubTotals($sheet, $groupType->value, $row, $firstColumnCell, $lastColumnCell);
                    $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");
                    $this->sheetStylerService->applyCellFill($sheet, "D{$row}:BJ{$row}", 'DBE9F7');
                }

                $row++;
            }

            foreach (array_keys($divisionTotalByAllotmentClass) as $allotmentClassAcronym) {
                $sheet->setCellValue("A{$row}", $allotmentClassAcronym);

                $allotmentClassTotals[$allotmentClassAcronym][] = $row;

                $startRow = $divisionStartRow;   // first detail row for this division
                $endRow = $lastColumnCell + 1;
                $allotmentClassByDivisionStartRow = $endRow + 1;
                $criteriaCell = "\$A{$row}";

                foreach (BURGroup::cases() as $groupType) {
                    $this->sheetWriterService->writeDivisionTotalByAllotmentClass($sheet, $groupType->value, $row, $criteriaCell, $startRow, $endRow);
                    $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");
                    $this->sheetStylerService->applyCellFill($sheet, "A{$row}:BJ{$row}", 'B8CCE4');
                }

                $row++; // then move to next row
            }

            $sheet->setCellValue("A{$row}", 'Total');

            // use SUM from divisionStartRow to the last Allotment Class row
            $firstRow = $allotmentClassByDivisionStartRow;
            $lastRow = $row - 1; // last allotment class summary row

            foreach (BURGroup::cases() as $groupType) {
                $this->sheetWriterService->writeDivisionTotal($sheet, $groupType->value, $row, $firstRow, $lastRow);
                $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");
                $this->sheetStylerService->setFontBold($sheet, "A{$row}:BJ{$row}");
                $this->sheetStylerService->applyCellFill($sheet, "A{$row}:BJ{$row}", '95B3D7');
            }

            // store the row number so we can use it later for the GRAND TOTAL
            $divisionTotalRows[] = $row;

            $row++;
        }

        $sheet->setCellValue("A{$row}", 'GRAND TOTAL (Current and Continuing Appropriations)');

        foreach (BURGroup::cases() as $groupType) {
            $this->sheetWriterService->writeGrandTotal($sheet, $groupType->value, $row, $divisionTotalRows);
            $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");
            $this->sheetStylerService->setFontBold($sheet, "A{$row}:BJ{$row}");
            $this->sheetStylerService->applyCellFill($sheet, "A{$row}:BJ{$row}", '95B3D7');
        }

        $row++;
        $sheet->setCellValue("A{$row}", 'Recapitulation:');
        $sheet->getStyle("A{$row}")->getFont()->setItalic(true);
        $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");

        foreach ($allotmentClassTotals as $allotmentClassAcronym => $rowsForClass) {
            $row++;
            $sheet->setCellValue("A{$row}", $allotmentClassAcronym);

            foreach (BURGroup::cases() as $groupType) {
                $this->sheetWriterService->writeGrandTotal($sheet, $groupType->value, $row, $rowsForClass);
                $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");
                $sheet->getStyle("A{$row}:BJ{$row}")->getFont()->setBold(true)->getColor()->setARGB('FF0000');
            }

            $recapitulationPerAllotmentClassTotals[] = $row;
        }

        // RECAPITULATION GRAND TOTALS (CURRENT + CONTINUING APPROPRIATION)
        $row++;
        $sheet->setCellValue("A{$row}", 'GRAND TOTAL (Current and Continuing Appropriations)');

        foreach (BURGroup::cases() as $groupType) {
            $this->sheetWriterService->writeGrandTotal($sheet, $groupType->value, $row, $recapitulationPerAllotmentClassTotals);
            $this->sheetStylerService->applyBorder($sheet, "A{$row}:BJ{$row}");
            $sheet->getStyle("A{$row}:BJ{$row}")->getFont()->setBold(true)->getColor()->setARGB('FF0000');
            $this->sheetStylerService->applyCellFill($sheet, "A{$row}:BJ{$row}", '95B3D7');
        }
    }
}
