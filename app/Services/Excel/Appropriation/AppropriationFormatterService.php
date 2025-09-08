<?php

declare(strict_types=1);

namespace App\Services\Excel\Appropriation;

use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AppropriationFormatterService
{
    public function formatHeaderRow(Worksheet $sheet, int $row, string $color = '3C665B'): void
    {
        $sheet->getStyle("B{$row}:AS{$row}")
            ->getFont()->setBold(true)->getColor()->setARGB('FFFFFF');

        $sheet->getStyle("B{$row}:AS{$row}")
            ->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB($color);

        $sheet->getStyle("B{$row}:AQ{$row}")
            ->getNumberFormat()->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');

        $sheet->getStyle("B{$row}:AS{$row}")
            ->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
    }
}
