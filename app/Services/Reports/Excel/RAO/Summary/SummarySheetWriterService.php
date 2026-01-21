<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Summary;

use App\Models\Allocation;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class SummarySheetWriterService
{
    public function __construct(
        private SummaryFormulaBuilderService $formulaBuilder,
        private SummaryRowStylerService $rowStyler,
        private SummaryTotalRowWriterService $totalRowWriter,
    ) {}

    public function write(Worksheet $sheet, int $row, Allocation $allocation): void
    {
        $summaryRowStart = $row + 3;
        $firstSummaryRow = $summaryRowStart;

        foreach ($allocation->objectDistributions as $objectDistribution) {
            $formulas = $this->formulaBuilder->build($row, $summaryRowStart);

            $sheet->setCellValue('C'.$summaryRowStart, $objectDistribution->expenditure_name);
            $sheet->setCellValue('E'.$summaryRowStart, $objectDistribution->expenditure_code);
            $sheet->setCellValue('F'.$summaryRowStart, $formulas['F']);
            $sheet->setCellValue('G'.$summaryRowStart, $formulas['G']);

            $this->rowStyler->apply($sheet, $summaryRowStart);

            $summaryRowStart++;
        }

        $this->totalRowWriter->write($sheet, $firstSummaryRow, $summaryRowStart - 1);
    }
}
