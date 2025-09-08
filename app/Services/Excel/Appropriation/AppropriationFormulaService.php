<?php

declare(strict_types=1);

namespace App\Services\Excel\Appropriation;

use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AppropriationFormulaService
{
    public function write(Worksheet $sheet, int $row): void
    {
        $sheet->setCellValue("AR{$row}", "=IF(M{$row}=0, \"\", Z{$row}/M{$row})");
        $sheet->setCellValue("AS{$row}", "=IF(Z{$row}=0, \"\", AM{$row}/Z{$row})");

        $sheet->getStyle("AR{$row}:AS{$row}")
            ->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);

        $sheet->getStyle("AR{$row}:AS{$row}")
            ->getFont()->setBold(true);
    }
}
