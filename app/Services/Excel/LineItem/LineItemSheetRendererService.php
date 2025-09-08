<?php

declare(strict_types=1);

namespace App\Services\Excel\LineItem;

use App\Services\Excel\AllotmentClass\AllotmentClassRendererService;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LineItemSheetRendererService
{
    public function __construct(
        private readonly LineItemWriterService $writerService,
        private readonly AllotmentClassRendererService $allotmentClassRenderer,
    ) {}

    /**
     * @param  iterable<int, array{...}>  $lineItems
     * @param  array<int, int>  $lineItemTotalRows
     */
    public function render(Worksheet $sheet, iterable $lineItems, int &$row, array &$lineItemTotalRows): void
    {
        foreach ($lineItems as $item) {
            /** @var array{
             *     Data?: array{name: string, code: string},
             *     'Allotment Class'?: array<string, array<string, float|int|string|null>>
             * } $item
             */
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
