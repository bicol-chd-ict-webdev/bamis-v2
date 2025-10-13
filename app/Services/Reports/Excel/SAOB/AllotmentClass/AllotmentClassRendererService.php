<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AllotmentClass;

use App\Services\Reports\Excel\SAOB\SheetTotalWriterService;
use App\Services\Reports\Excel\SAOB\SourceKeyRendererService;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type SourceData from \App\Services\Reports\Excel\SAOB\SourceKeyRendererService
 */
final readonly class AllotmentClassRendererService
{
    public function __construct(
        private SourceKeyRendererService $sourceKeyRenderer,
        private SheetTotalWriterService $totalWriter,
        private AllotmentClassStylerService $stylerService,
        private AllotmentClassLabelRendererService $labelRendererService,
        private AllotmentClassFormulaService $formulaService,
    ) {}

    /**
     * @param  array<string, array<string, mixed>>  $classItems
     * @param  array<int>  $classTotalRows
     */
    public function render(
        Worksheet $sheet,
        string $classKey,
        array $classItems,
        int &$row,
        array &$classTotalRows,
    ): void {
        $data = $classItems['Data'] ?? null;
        if (! $data) {
            return;
        }

        $sheet->setCellValue("B{$row}", $classKey);
        $classTotalRow = $row;
        $classTotalRows[] = $classTotalRow;

        $this->stylerService->formatHeader($sheet, $row);

        $row++;
        $formulaRows = [];
        $saaSourceRows = [];

        /** @var array<int, string> $sourceKeys */
        $sourceKeys = array_keys(array_filter($classItems, fn ($_, $k): bool => $k !== 'Data', ARRAY_FILTER_USE_BOTH));

        $sourceCount = count($sourceKeys);
        for ($i = 0; $i < $sourceCount; $i++) {
            $sourceKey = $sourceKeys[$i];
            /** @var SourceData $sourceData */
            $sourceData = $classItems[$sourceKey];

            // render the source (this will append to $formulaRows and register SAA rows into $saaSourceRows)
            $this->sourceKeyRenderer->render($sheet, $sourceKey, $sourceData, $row, $formulaRows, $saaSourceRows);

            // if this sourceKey is an SAA, get its year
            $currSaaYear = null;
            if (str_starts_with($sourceKey, 'SAA') && preg_match('/\b(20\d{2})\b/', $sourceKey, $m)) {
                $currSaaYear = (int) $m[1];
            }

            // look ahead to the next key and see if it's SAA of the same year
            $nextKey = $sourceKeys[$i + 1] ?? null;
            $nextSaaYear = null;
            if ($nextKey !== null && str_starts_with($nextKey, 'SAA') && preg_match('/\b(20\d{2})\b/', $nextKey, $n)) {
                $nextSaaYear = (int) $n[1];
            }

            // If current is SAA and next is absent or different year -> render Sub-total for current SAA year immediately
            if ($currSaaYear !== null && $currSaaYear !== $nextSaaYear) {
                $rowsForYear = $saaSourceRows[$currSaaYear] ?? [];
                $saaFormulaRows = $this->formulaService->filterBySource($formulaRows, $rowsForYear);

                if ($saaFormulaRows !== []) {
                    $this->labelRendererService->render($sheet, $row, "Sub-total SAA {$currSaaYear}:");
                    $this->totalWriter->writeTotalFromRows($sheet, $saaFormulaRows, $row);
                    $row++;

                    if ($nextSaaYear !== null) {
                        $row++;
                    }
                }

                // avoid rendering the same year's subtotal again
                unset($saaSourceRows[$currSaaYear]);
            }
        }

        if ($formulaRows !== []) {
            $this->totalWriter->writeTotalFromRows($sheet, $formulaRows, $classTotalRow);
        }
    }

    public function getTotalWriter(): SheetTotalWriterService
    {
        return $this->totalWriter;
    }
}
