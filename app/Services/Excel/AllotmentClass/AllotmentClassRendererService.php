<?php

declare(strict_types=1);

namespace App\Services\Excel\AllotmentClass;

use App\Services\Excel\SheetTotalWriterService;
use App\Services\Excel\SourceKeyRendererService;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type SourceData from \App\Services\Excel\SourceKeyRendererService
 */
class AllotmentClassRendererService
{
    public function __construct(
        protected SourceKeyRendererService $sourceKeyRenderer,
        protected SheetTotalWriterService $totalWriter,
        protected AllotmentClassStylerService $stylerService,
        protected AllotmentClassLabelRendererService $labelRendererService,
        protected AllotmentClassFormulaService $formulaService,
    ) {}

    /**
     * @param  array<string, array<string, mixed>>  $classItems
     * @param  array<int>  $classTotalRows
     */
    public function render(Worksheet $sheet, string $classKey, array $classItems, int &$row, array &$classTotalRows): void
    {
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

        foreach ($sourceKeys as $sourceKey) {
            /** @var SourceData $sourceData */
            $sourceData = $classItems[$sourceKey];

            $this->sourceKeyRenderer->render($sheet, $sourceKey, $sourceData, $row, $formulaRows, $saaSourceRows);
        }

        if (count($saaSourceRows) > 1) {
            $this->labelRendererService->render($sheet, $row, 'Sub-total SAA:');

            /** @var array<int> $formulaRows */
            /** @var array<int> $saaSourceRows */
            $saaFormulaRows = $this->formulaService->filterBySource($formulaRows, $saaSourceRows);
            if ($saaFormulaRows !== []) {
                $this->totalWriter->writeTotalFromRows($sheet, $saaFormulaRows, $row);
            }

            $row++;
        }

        if ($formulaRows !== []) {
            /** @var non-empty-array<int> $formulaRows */
            $this->totalWriter->writeTotalFromRows($sheet, $formulaRows, $classTotalRow);
        }
    }

    public function getTotalWriter(): SheetTotalWriterService
    {
        return $this->totalWriter;
    }
}
