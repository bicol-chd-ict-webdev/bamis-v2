<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB;

use App\Services\Reports\Excel\SAOB\ObjectDistribution\ObjectDistributionWriterService;
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

        // If this is an SAA source, extract the year (e.g. "SAA NO. 2024-03-...") and store the source-row keyed by that year.
        if (str_starts_with($sourceKey, 'SAA')) {
            if (preg_match('/\b(20\d{2})\b/', $sourceKey, $m)) {
                $saaYear = (int) $m[1];
            } else {
                $saaYear = 0; // fallback bucket if year can't be parsed
            }

            // $saaSourceRows is now an associative array keyed by year: [2024 => [row1, row2], 2025 => [...]]
            $saaSourceRows[$saaYear][] = $formulaRow;
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
