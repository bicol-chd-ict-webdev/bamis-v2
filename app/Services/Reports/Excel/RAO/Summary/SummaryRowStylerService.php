<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Summary;

use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SummaryRowStylerService
{
    public function apply(Worksheet $sheet, int $row): void
    {
        $sheet->getStyle("F{$row}:G{$row}")
            ->getNumberFormat()
            ->setFormatCode('#,##0.00');

        $sheet->getStyle("C{$row}:G{$row}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
    }
}
