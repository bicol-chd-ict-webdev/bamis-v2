<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\ObjectDistribution;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class ObjectDistributionFormatterService
{
    public function applyFormatting(Worksheet $sheet, int $row): void
    {
        // Code column
        $sheet->getStyle('C'.$row)
            ->getNumberFormat()
            ->setFormatCode('#');

        // Alignment
        $sheet->getStyle('C'.$row)
            ->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_CENTER)
            ->setVertical(Alignment::VERTICAL_CENTER);

        // Amounts
        $sheet->getStyle(sprintf('E%d:AQ%d', $row, $row))
            ->getNumberFormat()
            ->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');

        // Percentages
        $sheet->getStyle(sprintf('AR%d:AS%d', $row, $row))
            ->getNumberFormat()
            ->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);

        // Font
        $sheet->getStyle(sprintf('AR%d:AS%d', $row, $row))
            ->getFont()
            ->setBold(true);
    }
}
