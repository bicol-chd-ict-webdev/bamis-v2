<?php

declare(strict_types=1);

namespace App\Services\RAO;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RaoHeadingRendererService
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
        $sheet->setCellValue('A11', 'DATE');
        $sheet->setCellValue('B11', 'REFERENCE');
        $sheet->setCellValue('B12', 'DATE');
        $sheet->setCellValue('C12', 'SERIES NO.');
        $sheet->setCellValue('E11', 'UACS CODE / EXPENDITURE');
        $sheet->setCellValue('F11', 'ALLOTMENT');
        $sheet->setCellValue('G11', 'CREDITOR');
        $sheet->setCellValue('H11', 'PARTICULARS');
        $sheet->setCellValue('I11', 'OBLIGATION');
        $sheet->setCellValue('J11', 'UNOBLIGATED BALANCES');
        $sheet->setCellValue('K11', 'DISBURSEMENT');
        $sheet->setCellValue('L11', 'UNPAID OBLIGATIONS');
        $sheet->setCellValue('L12', 'DUE & DEMANDABLE');
        $sheet->setCellValue('M12', 'NOT YET DUE & DEMANDABLE');
    }

    private function mergeCells(Worksheet $sheet): void
    {
        $sheet->mergeCells('B11:C11');
        $sheet->mergeCells('L11:M11');
        $sheet->mergeCells('A11:A12');
        $sheet->mergeCells('D11:D12');
        $sheet->mergeCells('E11:E12');
        $sheet->mergeCells('F11:F12');
        $sheet->mergeCells('G11:G12');
        $sheet->mergeCells('H11:H12');
        $sheet->mergeCells('I11:I12');
        $sheet->mergeCells('J11:J12');
        $sheet->mergeCells('K11:K12');
    }

    private function setColumnWidths(Worksheet $sheet): void
    {
        $widths = [
            'A' => 15,
            'B' => 10,
            'C' => 33,
            'D' => 10,
            'E' => 12,
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
            $sheet->getColumnDimension($col)->setWidth($width);
        }
    }

    private function applyStyles(Worksheet $sheet): void
    {
        $sheet->getStyle('A11:M12')->getFont()->setBold(true)->setSize(9);

        $sheet->getStyle('A11:M12')->applyFromArray([
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

        $sheet->getStyle('L12:M12')->applyFromArray([
            'alignment' => [
                'wrapText' => true,
            ],
        ]);

        $sheet->getStyle('E11:J11')->applyFromArray([
            'alignment' => [
                'wrapText' => true,
            ],
        ]);
    }
}
