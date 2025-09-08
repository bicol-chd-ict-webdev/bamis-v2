<?php

declare(strict_types=1);

namespace App\Services\Excel\AllotmentClass;

use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AllotmentClassStylerService
{
    public function formatHeader(Worksheet $sheet, int $row): void
    {
        $range = "B{$row}:AS{$row}";
        $sheet->getStyle($range)
            ->getFont()->setBold(true)->getColor()->setARGB('FF0000');
        $sheet->getStyle($range)
            ->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('CAEDFB');
    }
}
