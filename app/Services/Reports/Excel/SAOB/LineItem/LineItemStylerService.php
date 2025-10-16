<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\LineItem;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class LineItemStylerService
{
    public function apply(Worksheet $sheet, int $row): void
    {
        $fullRowRange = "B{$row}:AS{$row}";

        $sheet->getStyle("B{$row}")->getAlignment()->setWrapText(true);

        $sheet->getStyle($fullRowRange)->getFont()
            ->setBold(true)
            ->getColor()->setARGB('BF4F14');

        $sheet->getStyle($fullRowRange)->getFill()
            ->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('DBE9F7');

        $sheet->getStyle("C{$row}")->getNumberFormat()->setFormatCode('#');

        $sheet->getStyle("C{$row}")->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_CENTER)
            ->setVertical(Alignment::VERTICAL_CENTER);
    }
}
