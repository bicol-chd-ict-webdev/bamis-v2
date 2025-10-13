<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Summary;

use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SummaryTotalRowWriterService
{
    public function write(Worksheet $sheet, int $firstRow, int $lastRow): void
    {
        $row = $lastRow + 1;

        $sheet->setCellValue("C{$row}", 'GRAND TOTAL');
        $sheet->setCellValue("F{$row}", "=SUM(F{$firstRow}:F{$lastRow})");
        $sheet->setCellValue("G{$row}", "=SUM(G{$firstRow}:G{$lastRow})");

        $sheet->getStyle("C{$row}:G{$row}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
            'font' => ['bold' => true],
        ]);

        $sheet->getStyle("F{$row}:G{$row}")
            ->getNumberFormat()
            ->setFormatCode('#,##0.00');

        $sheet->getStyle("C{$row}:G{$row}")
            ->getFill()
            ->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('093D93');

        $sheet->getStyle("C{$row}:G{$row}")->getFont()
            ->setBold(true)
            ->getColor()->setARGB('FFFFFF');
    }
}
