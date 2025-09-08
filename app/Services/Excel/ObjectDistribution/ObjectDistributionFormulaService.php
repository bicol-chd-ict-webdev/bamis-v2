<?php

declare(strict_types=1);

namespace App\Services\Excel\ObjectDistribution;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ObjectDistributionFormulaService
{
    public function applyFormulas(Worksheet $sheet, int $row): void
    {
        $sheet->setCellValue("F{$row}", "=J{$row}+K{$row}+L{$row}");
        $sheet->setCellValue("G{$row}", "=E{$row}+F{$row}");
        $sheet->setCellValue("M{$row}", "=H{$row}+I{$row}+J{$row}+K{$row}+L{$row}");
        $sheet->setCellValue("AN{$row}", "=+G{$row}-M{$row}");
        $sheet->setCellValue("AO{$row}", "=+M{$row}-Z{$row}");
        $sheet->setCellValue("AQ{$row}", "=SUM(Z{$row}+AM{$row}+AP{$row})");
        $sheet->setCellValue("AR{$row}", "=IF(M{$row}=0, \"\", Z{$row}/M{$row})");
        $sheet->setCellValue("AS{$row}", "=IF(Z{$row}=0, \"\", AM{$row}/Z{$row})");
    }
}
