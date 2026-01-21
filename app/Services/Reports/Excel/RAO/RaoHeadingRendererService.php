<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class RaoHeadingRendererService
{
    public function render(Worksheet $sheet): void
    {
        $this->setHeadings($sheet);
        $this->mergeCells($sheet);
        $this->setColumnWidths($sheet);
        $this->applyStyles($sheet);
    }

    private function setHeadings(Worksheet $sheet): void
    {
        $sheet->setCellValue('A10', 'DATE');
        $sheet->setCellValue('B10', 'REFERENCE');
        $sheet->setCellValue('B11', 'DATE');
        $sheet->setCellValue('C11', 'SERIES NO.');
        $sheet->setCellValue('E10', 'UACS CODE / EXPENDITURE');
        $sheet->setCellValue('F10', 'ALLOTMENT');
        $sheet->setCellValue('G10', 'CREDITOR');
        $sheet->setCellValue('H10', 'PARTICULARS');
        $sheet->setCellValue('I10', 'OBLIGATION');
        $sheet->setCellValue('J10', 'UNOBLIGATED BALANCES');
        $sheet->setCellValue('K10', 'DISBURSEMENT');
        $sheet->setCellValue('L10', 'UNPAID OBLIGATIONS');
        $sheet->setCellValue('L11', 'DUE & DEMANDABLE');
        $sheet->setCellValue('M11', 'NOT YET DUE & DEMANDABLE');
    }

    private function mergeCells(Worksheet $sheet): void
    {
        $sheet->mergeCells('B10:C10');
        $sheet->mergeCells('L10:M10');
        $sheet->mergeCells('A10:A11');
        $sheet->mergeCells('D10:D11');
        $sheet->mergeCells('E10:E11');
        $sheet->mergeCells('F10:F11');
        $sheet->mergeCells('G10:G11');
        $sheet->mergeCells('H10:H11');
        $sheet->mergeCells('I10:I11');
        $sheet->mergeCells('J10:J11');
        $sheet->mergeCells('K10:K11');
    }

    private function setColumnWidths(Worksheet $sheet): void
    {
        $widths = [
            'A' => 15,
            'B' => 10,
            'C' => 33,
            'D' => 10,
            'E' => 11,
            'F' => 15,
            'G' => 34,
            'H' => 43,
            'I' => 15,
            'J' => 15,
            'K' => 15,
            'L' => 15,
            'M' => 15,
        ];

        foreach ($widths as $col => $width) {
            /** @var string $col */
            /** @var int|float $width */
            $sheet->getColumnDimension($col)->setWidth($width);
        }
    }

    private function applyStyles(Worksheet $sheet): void
    {
        $sheet->getStyle('A10:M11')->getFont()->setBold(true)->setSize(9);

        $sheet->getStyle('A10:M11')->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_BOTTOM,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        $sheet->getStyle('L11:M11')->applyFromArray([
            'alignment' => [
                'wrapText' => true,
            ],
        ]);

        $sheet->getStyle('E10:J10')->applyFromArray([
            'alignment' => [
                'wrapText' => true,
            ],
        ]);
    }
}
