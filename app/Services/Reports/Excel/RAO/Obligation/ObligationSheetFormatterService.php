<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Obligation;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ObligationSheetFormatterService
{
    public function formatHeaderRow(Worksheet $sheet, int $row): void
    {
        $sheet->getStyle("F{$row}")
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle("F{$row}")
            ->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_RIGHT)
            ->setVertical(Alignment::VERTICAL_BOTTOM);

        $sheet->getStyle("K{$row}")
            ->getNumberFormat()->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');

        $sheet->getStyle("I{$row}:J{$row}")
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle("L{$row}:M{$row}")
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle("I{$row}:M{$row}")
            ->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_RIGHT)
            ->setVertical(Alignment::VERTICAL_BOTTOM);

        $sheet->getStyle("A{$row}:M{$row}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
    }

    public function formatObligationRow(Worksheet $sheet, int $row): void
    {
        $sheet->getStyle("F{$row}")
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle("I{$row}:J{$row}")
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle("L{$row}:M{$row}")
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle("K{$row}")
            ->getNumberFormat()->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');

        $sheet->getStyle("I{$row}:M{$row}")
            ->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_RIGHT)
            ->setVertical(Alignment::VERTICAL_BOTTOM);

        $sheet->getStyle("A{$row}:M{$row}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
    }
}
