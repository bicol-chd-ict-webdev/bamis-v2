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

    /**
     * @param array<string, array{
     *     sections: array<string, array{
     *         code: string,
     *         allotmentClasses: array<string, array<string, array{
     *             allotment: \Brick\Math\BigDecimal,
     *             obligation: \Brick\Math\BigDecimal,
     *             disbursement: \Brick\Math\BigDecimal
     *         }>>
     *     }>
     * }> $data
     */
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
        $divisionTotalRows = [];
        $lastColumnCell = 0;
        $allotmentClassByDivisionStartRow = 0;

        foreach ($data as $divisionAcronym => $sections) {
            $divisionStartRow = $row;

            $sheet->setCellValue('A'.$row, $divisionAcronym);

            $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));

            $divisionTotalByAllotmentClass = [
                'PS' => [],
                'MOOE' => [],
                'CO' => [],
            ];

            foreach ($sections['sections'] as $sectionName => $section) {
                $sheet->setCellValue('B'.$row, $sectionName === 'Personnel Services' ? $sectionName.' with RLIP' : $sectionName);
                $sheet->setCellValue('C'.$row, $section['code']);

                $sheet->getStyle('B'.$row)->applyFromArray([
                    'alignment' => [
                        'wrapText' => true,
                    ],
                ]);

                $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));

                $sectionStartRow = $row;
                foreach ($section['allotmentClasses'] as $allotmentClassAcronym => $allotment) {
                    $sheet->setCellValue('D'.$row, $allotmentClassAcronym);

                    foreach (BURGroup::cases() as $groupType) {
                        $this->sheetWriterService->writeSectionPerAllotmentClassTotals($sheet, $groupType->value, $row, $allotment);
                        $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));
                    }

                    $row++;
                }

                // subtotal row after all allotment classes
                $sheet->setCellValue('D'.$row, 'Sub-Total');

                // use SUM from first allotment row to last allotment row
                $firstColumnCell = $sectionStartRow;
                $lastColumnCell = $row - 1;

                foreach (BURGroup::cases() as $groupType) {
                    $this->sheetWriterService->writeSectionSubTotals($sheet, $groupType->value, $row, $firstColumnCell, $lastColumnCell);
                    $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));
                    $this->sheetStylerService->applyCellFill($sheet, sprintf('D%d:BJ%d', $row, $row), 'DBE9F7');
                }

                $row++;
            }

            foreach (array_keys($divisionTotalByAllotmentClass) as $allotmentClassAcronym) {
                if ($allotmentClassAcronym === 'PS' && $divisionAcronym !== 'OTHERS') {
                    continue;
                }

                $sheet->setCellValue('A'.$row, $allotmentClassAcronym);

                $allotmentClassTotals[$allotmentClassAcronym][] = $row;

                $startRow = $divisionStartRow;   // first detail row for this division
                $endRow = $lastColumnCell + 1;
                $allotmentClassByDivisionStartRow = $endRow + 1;
                $criteriaCell = '$A'.$row;

                foreach (BURGroup::cases() as $groupType) {
                    $this->sheetWriterService->writeDivisionTotalByAllotmentClass($sheet, $groupType->value, $row, $criteriaCell, $startRow, $endRow);
                    $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));
                    $this->sheetStylerService->applyCellFill($sheet, sprintf('A%d:BJ%d', $row, $row), 'B8CCE4');
                }

                $row++; // then move to next row
            }

            $sheet->setCellValue('A'.$row, 'Total');

            // use SUM from divisionStartRow to the last Allotment Class row
            $firstRow = $allotmentClassByDivisionStartRow;
            $lastRow = $row - 1; // last allotment class summary row

            foreach (BURGroup::cases() as $groupType) {
                $this->sheetWriterService->writeDivisionTotal($sheet, $groupType->value, $row, $firstRow, $lastRow);
                $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));
                $this->sheetStylerService->setFontBold($sheet, sprintf('A%d:BJ%d', $row, $row));
                $this->sheetStylerService->applyCellFill($sheet, sprintf('A%d:BJ%d', $row, $row), '95B3D7');
            }

            // store the row number so we can use it later for the GRAND TOTAL
            $divisionTotalRows[] = $row;

            $row++;
        }

        $sheet->setCellValue('A'.$row, 'GRAND TOTAL (Current and Continuing Appropriations)');

        foreach (BURGroup::cases() as $groupType) {
            $this->sheetWriterService->writeGrandTotal($sheet, $groupType->value, $row, $divisionTotalRows);
            $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));
            $this->sheetStylerService->setFontBold($sheet, sprintf('A%d:BJ%d', $row, $row));
            $this->sheetStylerService->applyCellFill($sheet, sprintf('A%d:BJ%d', $row, $row), '95B3D7');
        }

        $row++;
        $sheet->setCellValue('A'.$row, 'Recapitulation:');
        $sheet->getStyle('A'.$row)->getFont()->setItalic(true);
        $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));

        $recapitulationPerAllotmentClassTotals = [];
        foreach ($allotmentClassTotals as $allotmentClassAcronym => $rowsForClass) {
            $row++;
            $sheet->setCellValue('A'.$row, $allotmentClassAcronym);

            foreach (BURGroup::cases() as $groupType) {
                $this->sheetWriterService->writeGrandTotal($sheet, $groupType->value, $row, $rowsForClass);
                $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));
                $sheet->getStyle(sprintf('A%d:BJ%d', $row, $row))->getFont()->setBold(true)->getColor()->setARGB('FF0000');
            }

            $recapitulationPerAllotmentClassTotals[] = $row;
        }

        // RECAPITULATION GRAND TOTALS (CURRENT + CONTINUING APPROPRIATION)
        $row++;
        $sheet->setCellValue('A'.$row, 'GRAND TOTAL (Current and Continuing Appropriations)');

        foreach (BURGroup::cases() as $groupType) {
            $this->sheetWriterService->writeGrandTotal($sheet, $groupType->value, $row, $recapitulationPerAllotmentClassTotals);
            $this->sheetStylerService->applyBorder($sheet, sprintf('A%d:BJ%d', $row, $row));
            $sheet->getStyle(sprintf('A%d:BJ%d', $row, $row))->getFont()->setBold(true)->getColor()->setARGB('FF0000');
            $this->sheetStylerService->applyCellFill($sheet, sprintf('A%d:BJ%d', $row, $row), '95B3D7');
        }

        // SIGNATORIES
        $row += 4;
        $sheet->setCellValue('B'.$row, 'ELOISA JOY N. JOVEN');
        $sheet->setCellValue('F'.$row, 'MARY JOY A. LLORCA, MBA-FM');
        $sheet->setCellValue('I'.$row, 'DANTE F. ATENTO');

        $this->sheetStylerService->setFontBold($sheet, sprintf('B%d:I%d', $row, $row));

        $row++;
        $sheet->setCellValue('B'.$row, 'Administrative Aide III');
        $sheet->setCellValue('F'.$row, 'Administrative Officer V');
        $sheet->setCellValue('I'.$row, 'Chief Administrative Officer');

        $row += 7;
        $sheet->setCellValue('B'.$row, 'DAIZY A. BAZMAYOR	');
        $this->sheetStylerService->setFontBold($sheet, 'B'.$row);

        $row++;
        $sheet->setCellValue('B'.$row, 'Administrative Assistant II');
    }
}
