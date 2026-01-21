<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type UtilizationRow from UtilizationByAllotmentClassDataBuilder
 * @phpstan-import-type COData from UtilizationByAllotmentClassDataBuilder
 */
final readonly class UtilizationByAllotmentClassReportService
{
    public function __construct(
        private HeaderBuilder $headerBuilder,
        private ReportRenderer $renderer,
        private ReportStyler $styler,
    ) {}

    /**
     * @param  array<string, array<int, UtilizationRow>>  $ps
     * @param  array<string, array<int, UtilizationRow>>  $mooe
     * @param  COData  $co
     */
    public function generate(string $date, array $ps, array $mooe, array $co): Spreadsheet
    {
        $spreadsheet = new Spreadsheet();
        $spreadsheet->getDefaultStyle()->getFont()->setName('Calibri')->setSize(11);

        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('BUR by Allotment Class');

        $this->headerBuilder->build($sheet, $date);

        $currentRow = 6;
        $psTotalRow = $this->renderer->renderPS($sheet, $currentRow, $ps);

        $currentRow = $psTotalRow + 1;
        $mooeTotalRow = $this->renderer->renderMooe($sheet, $currentRow, $mooe);

        $currentRow = $mooeTotalRow + 1;
        $coTotalRow = $this->renderer->renderCo($sheet, $currentRow, $co);

        $currentRow = $coTotalRow + 1;
        $this->renderGrandTotal($sheet, $currentRow, $psTotalRow, $mooeTotalRow, $coTotalRow);

        $this->renderSignatory($sheet, $currentRow);

        $lastRow = $coTotalRow + 1;
        $this->styler->applyDataRangeBorders($sheet, $lastRow);

        return $spreadsheet;
    }

    private function renderGrandTotal(Worksheet $sheet, int $row, int $psTotal, int $mooeTotal, int $coTotal): void
    {
        $sheet->setCellValue('A'.$row, 'GRAND TOTAL');
        $sheet->mergeCells(sprintf('A%d:B%d', $row, $row));

        $formulas = new FormulaBuilder($row);
        $formulas->setGrandTotalFormulas($sheet, $psTotal, $mooeTotal, $coTotal);

        $this->styler->applyTotalRowStyle($sheet, sprintf('A%d:I%d', $row, $row));
    }

    private function renderSignatory(Worksheet $sheet, int $row): void
    {
        $documentAttributionsRow = $row + 2;

        $sheet->setCellValue('A'.$documentAttributionsRow, 'Prepared By:');
        $sheet->setCellValue('D'.$documentAttributionsRow, 'Noted By:');
        $sheet->setCellValue('G'.$documentAttributionsRow, 'Approved By:');

        $namesRow = $documentAttributionsRow + 4;
        $sheet->setCellValue('A'.$namesRow, 'MARICRIS LYNETH C. RELLEVE');
        $sheet->setCellValue('D'.$namesRow, 'MARY JOY LLORCA, MBA-FM');
        $sheet->setCellValue('G'.$namesRow, 'DANTE F. ATENTO');

        $sheet->getStyle(sprintf('A%d:G%d', $namesRow, $namesRow))->applyFromArray([
            'font' => [
                'bold' => true,
            ],
        ]);

        $designationsRow = $namesRow + 1;
        $sheet->setCellValue('A'.$designationsRow, 'Administrative Assistant III');
        $sheet->setCellValue('D'.$designationsRow, 'Administrative Officer V');
        $sheet->setCellValue('G'.$designationsRow, 'Chief Administrative Officer');
    }
}
