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
            $sheet->setCellValue('B'.$row, $label);
        }

        $sheet->getStyle(sprintf('B%d:AS%d', $row, $row))
            ->getFont()->setBold(true)->getColor()->setARGB('FFFFFF');

        $sheet->getStyle(sprintf('B%d:AS%d', $row, $row))
            ->getFill()->setFillType('solid')->getStartColor()->setARGB('4B583E');

        $sheet->getStyle(sprintf('B%d:AQ%d', $row, $row))
            ->getNumberFormat()->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');
    }

    public function applyPercentageStyle(Worksheet $sheet, int $row): void
    {
        $sheet->getStyle(sprintf('AR%d:AS%d', $row, $row))
            ->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);

        $sheet->getStyle(sprintf('AR%d:AS%d', $row, $row))
            ->getFont()->setBold(true);
    }
}
