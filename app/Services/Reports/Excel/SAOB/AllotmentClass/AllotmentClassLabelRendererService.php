<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AllotmentClass;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AllotmentClassLabelRendererService
{
    public function render(Worksheet $sheet, int $row, string $label): void
    {
        $sheet->setCellValue("B{$row}", $label);
        $sheet->getStyle("B{$row}")->getFont()->setBold(true);
    }
}
