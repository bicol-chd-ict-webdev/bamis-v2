<?php

declare(strict_types=1);

namespace App\Services\Excel;

use App\Services\Excel\ObjectDistribution\ObjectDistributionWriterService;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SourceKeyRendererService
{
    public function __construct(
        protected ObjectDistributionWriterService $objectDistributionWriterService,
        protected SheetTotalWriterService $totalWriter
    ) {}

    public function render(
        Worksheet $sheet,
        string $sourceKey,
        array $sourceData,
        int &$row,
        array &$formulaRows,
        array &$saaSourceRows
    ): void {
        $formulaRow = $row;
        $sheet->setCellValue("B{$row}", $sourceKey);

        if (str_starts_with($sourceKey, 'SAA')) {
            $saaSourceRows[] = $formulaRow;
        }

        $sheet->getStyle("B{$row}")->getFont()->setBold(true)->getColor()->setARGB('0E2841');
        $row++;

        $particulars = $sourceData['Data']['particulars'] ?? null;
        if (! empty($particulars)) {
            $sheet->setCellValue("B{$row}", $particulars);
            $sheet->getStyle("B{$row}")->getFont()->setBold(true);
            $row++;
        }

        $objectDistributions = $sourceData['Object Distribution'] ?? [];
        $startSumRow = $row;
        $this->objectDistributionWriterService->write($sheet, $objectDistributions, $row);
        $endSumRow = $row - 1;

        if ($startSumRow <= $endSumRow) {
            $this->totalWriter->writeSubtotal($sheet, $startSumRow, $endSumRow, $formulaRow);
            $formulaRows[] = $formulaRow;
        }
    }
}
