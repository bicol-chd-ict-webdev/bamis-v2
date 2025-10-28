<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

final class ReportStyler
{
    private const HEADER_COLOR = '073763';

    private const WHITE_COLOR = 'FFFFFF';

    private const SUBTOTAL_COLOR = '404040';

    public function applyHeaderStyle($sheet, string $range): void
    {
        $sheet->getStyle($range)->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => ['borderStyle' => Border::BORDER_THIN],
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => self::HEADER_COLOR],
            ],
            'font' => [
                'bold' => true,
                'color' => ['rgb' => self::WHITE_COLOR],
            ],
        ]);
    }

    public function applySubtotalStyle($sheet, string $range): void
    {
        $sheet->getStyle($range)->applyFromArray([
            'font' => [
                'italic' => true,
                'color' => ['rgb' => self::SUBTOTAL_COLOR],
            ],
        ]);
    }

    public function applyTotalRowStyle($sheet, string $range): void
    {
        $style = [
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => self::HEADER_COLOR],
            ],
            'font' => [
                'bold' => true,
                'color' => ['rgb' => self::WHITE_COLOR],
            ],
        ];

        $sheet->getStyle($range)->applyFromArray($style);
    }

    public function applyDataRangeBorders($sheet, int $lastRow): void
    {
        $sheet->getStyle("A5:I{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);
    }
}
