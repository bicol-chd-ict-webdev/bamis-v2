<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Appropriation;

use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class AppropriationFormulaService
{
    public function write(Worksheet $sheet, int $row): void
    {
        $sheet->setCellValue('AR'.$row, sprintf('=IF(M%d=0, "", Z%d/M%d)', $row, $row, $row));
        $sheet->setCellValue('AS'.$row, sprintf('=IF(Z%d=0, "", AM%d/Z%d)', $row, $row, $row));

        $sheet->getStyle(sprintf('AR%d:AS%d', $row, $row))
            ->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);

        $sheet->getStyle(sprintf('AR%d:AS%d', $row, $row))
            ->getFont()->setBold(true);
    }
}
