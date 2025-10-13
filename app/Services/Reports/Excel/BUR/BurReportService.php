<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use PhpOffice\PhpSpreadsheet\Spreadsheet;

final readonly class BurReportService
{
    public function __construct(
        private BurDataFetcherService $fetcher,
        private BurResultTransformerService $transformer,
        private BurSheetRendererService $renderer,
    ) {}

    public function generate(string $date): Spreadsheet
    {
        $rows = $this->fetcher->fetch($date);
        $result = $this->transformer->transform($rows);

        $spreadsheet = new Spreadsheet();
        $spreadsheet->getDefaultStyle()->getFont()->setName('Calibri')->setSize(11);

        $this->renderer->render($spreadsheet, $result, $date);

        return $spreadsheet;
    }
}
