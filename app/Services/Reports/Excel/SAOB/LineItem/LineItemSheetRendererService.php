<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\LineItem;

use App\Services\Reports\Excel\SAOB\AllotmentClass\AllotmentClassRendererService;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class LineItemSheetRendererService
{
    public function __construct(
        private LineItemWriterService $writerService,
        private AllotmentClassRendererService $allotmentClassRenderer,
    ) {}

    /**
     * @param  iterable<int, array{...}>  $lineItems
     * @param  array<int, int>  $lineItemTotalRows
     */
    public function render(Worksheet $sheet, iterable $lineItems, int &$row, array &$lineItemTotalRows): void
    {
        foreach ($lineItems as $item) {
            $data = $item['Data'] ?? null;
            $lineItemRow = $row;

            if ($data) {
                $lineItemTotalRows[] = $lineItemRow;
                $this->writerService->render($sheet, $data, $row);
                $row++;
            }

            $classTotalRows = [];
            $classes = $item['Allotment Class'] ?? [];

            foreach ($classes as $classKey => $classItems) {
                /** @var array<string, array<string, mixed>> $classItems */
                $this->allotmentClassRenderer->render($sheet, $classKey, $classItems, $row, $classTotalRows);
            }

            if ($classTotalRows !== []) {
                $this->allotmentClassRenderer
                    ->getTotalWriter()
                    ->writeTotalFromRows($sheet, $classTotalRows, $lineItemRow);
            }

            $row++;
        }
    }
}
