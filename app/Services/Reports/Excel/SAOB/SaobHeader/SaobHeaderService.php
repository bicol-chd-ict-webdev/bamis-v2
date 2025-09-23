<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\SaobHeader;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SaobHeaderService
{
    public function __construct(
        private readonly SaobHeaderTitleRendererService $titleRendererService,
        private readonly SaobHeaderMetaRendererService $metaRendererService,
        private readonly SaobHeaderColumnConfigurerService $columnConfigurerService,
        private readonly SaobHeaderCellMergerService $cellMergerService,
        private readonly SaobHeaderCellWriterService $cellWriterService,
        private readonly SaobHeaderStylerService $stylerService,
    ) {}

    public function render(Worksheet $sheet, string $formattedDate, int $year, int $prevYear): void
    {
        $this->titleRendererService->render($sheet, $formattedDate);
        $this->metaRendererService->render($sheet);
        $this->columnConfigurerService->configure($sheet);
        $this->cellMergerService->merge($sheet);
        $this->cellWriterService->write($sheet, $year, $prevYear);
        $this->stylerService->apply($sheet);
    }
}
