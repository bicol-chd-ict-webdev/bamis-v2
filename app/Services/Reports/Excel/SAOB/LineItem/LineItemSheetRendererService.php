<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\LineItem;

use App\Services\Reports\Excel\SAOB\AllocationGrouper;
use App\Services\Reports\Excel\SAOB\AllotmentClass\AllotmentClassRendererService;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type SAOMLineItemData from AllocationGrouper
 * @phpstan-import-type SAOBSourceData from AllocationGrouper
 */
final readonly class LineItemSheetRendererService
{
    public function __construct(
        private LineItemWriterService $writerService,
        private AllotmentClassRendererService $allotmentClassRenderer,
    ) {}

    /**
     * @param  iterable<int, SAOMLineItemData>  $lineItems
     * @param  array<int, int|string>  $lineItemTotalRows
     */
    public function render(Worksheet $sheet, iterable $lineItems, int &$row, array &$lineItemTotalRows): void
    {
        foreach ($lineItems as $item) {
            $data = $item['Data'];
            $lineItemRow = $row;

            $lineItemTotalRows[] = $lineItemRow;
            $this->writerService->render($sheet, $data, $row);
            $row++;

            $classTotalRows = [];
            /** @var array<string, array<string, mixed>> $classes */
            $classes = $item['Allotment Class'];

            foreach ($classes as $classKey => $classItems) {
                /** @var array<string, SAOBSourceData> $classItems */
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
