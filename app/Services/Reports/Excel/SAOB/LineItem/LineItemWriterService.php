<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\LineItem;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LineItemWriterService
{
    public function __construct(
        private readonly LineItemDataRendererService $dataRendererService,
        private readonly LineItemStylerService $stylerService,
    ) {}

    /**
     * @param  array{name: string, code: int|string}  $data
     */
    public function render(Worksheet $sheet, array $data, int $row): void
    {
        $this->dataRendererService->render($sheet, $data, $row);
        $this->stylerService->apply($sheet, $row);
    }
}
