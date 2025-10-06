<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Summary;

use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SummaryHeaderRendererService
{
    public function render(Worksheet $sheet, int $lastRow): void
    {
        $lastRow++;
        $summaryStartRow = $lastRow + 1;

        $sheet->setCellValue("B{$summaryStartRow}", 'SUMMARY');
        $sheet->setCellValue("C{$summaryStartRow}", 'Object of Expenditures');
        $sheet->setCellValue("C{$summaryStartRow}", 'Object Code');
        $sheet->setCellValue("E{$summaryStartRow}", 'UACS');
        $sheet->setCellValue("F{$summaryStartRow}", 'Obligation');
        $sheet->setCellValue("G{$summaryStartRow}", 'Disbursement');

        $sheet->getStyle("B{$summaryStartRow}:G{$summaryStartRow}")
            ->getFont()
            ->setBold(true);
        $sheet->getStyle("C{$summaryStartRow}:G{$summaryStartRow}")
            ->getFill()
            ->setFillType(Fill::FILL_SOLID)
            ->getStartColor()
            ->setARGB('B3CEFB');
        $sheet->getStyle("C{$summaryStartRow}:G{$summaryStartRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
    }
}
