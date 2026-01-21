<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AllotmentClass;

use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class AllotmentClassStylerService
{
    public function formatHeader(Worksheet $sheet, int $row): void
    {
        $range = sprintf('B%d:AS%d', $row, $row);
        $sheet->getStyle($range)
            ->getFont()->setBold(true)->getColor()->setARGB('FF0000');
        $sheet->getStyle($range)
            ->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('CAEDFB');
    }
}
