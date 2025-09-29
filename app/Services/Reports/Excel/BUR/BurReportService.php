<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use PhpOffice\PhpSpreadsheet\Spreadsheet;

class BurReportService
{
    public function __construct(
        private readonly BurDataFetcherService $fetcher,
        private readonly BurResultTransformerService $transformer,
        private readonly BurSheetRendererService $renderer,
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
