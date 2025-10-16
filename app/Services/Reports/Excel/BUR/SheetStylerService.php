<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SheetStylerService
{
    public function applyBorder(Worksheet $sheet, string $cellCoordinate): void
    {
        $sheet->getStyle($cellCoordinate)->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
    }

    public function setFontBold(Worksheet $sheet, string $cellCoordinate): void
    {
        $sheet->getStyle($cellCoordinate)
            ->getFont()
            ->setBold(true);
    }

    public function applyCellFill(Worksheet $sheet, string $cellCoordinate, string $colorValue): void
    {
        $sheet->getStyle($cellCoordinate)
            ->getFill()
            ->setFillType(Fill::FILL_SOLID)
            ->getStartColor()
            ->setARGB($colorValue);
    }
}
