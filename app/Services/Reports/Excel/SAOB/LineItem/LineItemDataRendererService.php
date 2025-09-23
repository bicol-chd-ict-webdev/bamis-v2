<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\LineItem;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LineItemDataRendererService
{
    /**
     * @param  array{name: string, code: int|string}  $data
     */
    public function render(Worksheet $sheet, array $data, int $row): void
    {
        $name = $data['name'];
        $code = $data['code'];

        $sheet->setCellValue("B{$row}", $name);
        $sheet->setCellValue("C{$row}", $code);
    }
}
