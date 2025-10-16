<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\AppropriationSource;

use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class AppropriationSourceStylerService
{
    public function applyHeaderStyle(Worksheet $sheet, int $row, ?string $label = null): void
    {
        if ($label !== null) {
            $sheet->setCellValue("B{$row}", $label);
        }

        $sheet->getStyle("B{$row}:AS{$row}")
            ->getFont()->setBold(true)->getColor()->setARGB('FFFFFF');

        $sheet->getStyle("B{$row}:AS{$row}")
            ->getFill()->setFillType('solid')->getStartColor()->setARGB('4B583E');

        $sheet->getStyle("B{$row}:AQ{$row}")
            ->getNumberFormat()->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');
    }

    public function applyPercentageStyle(Worksheet $sheet, int $row): void
    {
        $sheet->getStyle("AR{$row}:AS{$row}")
            ->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);

        $sheet->getStyle("AR{$row}:AS{$row}")
            ->getFont()->setBold(true);
    }
}
