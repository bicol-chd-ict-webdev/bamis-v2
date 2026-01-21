<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Obligation;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class ObligationSheetFormatterService
{
    public function formatHeaderRow(Worksheet $sheet, int $row): void
    {
        $sheet->getStyle('F'.$row)
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle('F'.$row)
            ->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_RIGHT)
            ->setVertical(Alignment::VERTICAL_BOTTOM);

        $sheet->getStyle('K'.$row)
            ->getNumberFormat()->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');

        $sheet->getStyle(sprintf('I%d:J%d', $row, $row))
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle(sprintf('L%d:M%d', $row, $row))
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle(sprintf('I%d:M%d', $row, $row))
            ->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_RIGHT)
            ->setVertical(Alignment::VERTICAL_BOTTOM);

        $sheet->getStyle(sprintf('A%d:M%d', $row, $row))->applyFromArray([
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
        $sheet->getStyle('F'.$row)
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle(sprintf('I%d:J%d', $row, $row))
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle(sprintf('L%d:M%d', $row, $row))
            ->getNumberFormat()->setFormatCode('#,##0.00');

        $sheet->getStyle('K'.$row)
            ->getNumberFormat()->setFormatCode('_-* #,##0.00_-;-* #,##0.00_-;_-* -??_-;_-@');

        $sheet->getStyle(sprintf('I%d:M%d', $row, $row))
            ->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_RIGHT)
            ->setVertical(Alignment::VERTICAL_BOTTOM);

        $sheet->getStyle(sprintf('A%d:M%d', $row, $row))->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
    }
}
