<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class LabelCodeRowRendererService
{
    public function render(
        Worksheet $sheet,
        string $label,
        string|float|int $code,
        int &$row,
        ?string $labelColor = '000000',
        bool $boldCode = true
    ): void {
        // Column B: Label
        $sheet->setCellValue("B{$row}", $label);
        $sheet->getStyle("B{$row}")
            ->getFont()->setBold(true)->getColor()->setARGB($labelColor);
        $sheet->getStyle("B{$row}")->getAlignment()->setWrapText(true);

        // Column C: Code
        $sheet->setCellValue("C{$row}", (float) $code);
        $sheet->getStyle("C{$row}")
            ->getNumberFormat()->setFormatCode('#');
        $sheet->getStyle("C{$row}")->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_CENTER)
            ->setVertical(Alignment::VERTICAL_CENTER);

        if ($boldCode) {
            $sheet->getStyle("C{$row}")->getFont()->setBold(true);
        }

        $row++;
    }
}
