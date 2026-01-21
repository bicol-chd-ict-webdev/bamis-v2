<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\ObjectDistribution;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class ObjectDistributionFormulaService
{
    public function applyFormulas(Worksheet $sheet, int $row): void
    {
        $sheet->setCellValue('F'.$row, sprintf('=I%d+J%d+K%d+L%d', $row, $row, $row, $row));
        $sheet->setCellValue('G'.$row, sprintf('=E%d+F%d', $row, $row));
        $sheet->setCellValue('M'.$row, sprintf('=H%d+I%d+J%d+K%d+L%d', $row, $row, $row, $row, $row));
        $sheet->setCellValue('AN'.$row, sprintf('=+G%d-M%d', $row, $row));
        $sheet->setCellValue('AO'.$row, sprintf('=+M%d-Z%d', $row, $row));
        $sheet->setCellValue('AQ'.$row, sprintf('=Z%d-AM%d-AP%d', $row, $row, $row));
        $sheet->setCellValue('AR'.$row, sprintf('=IF(M%d=0, 0, Z%d/M%d)', $row, $row, $row));
        $sheet->setCellValue('AS'.$row, sprintf('=IF(Z%d=0, 0, AM%d/Z%d)', $row, $row, $row));
    }
}
