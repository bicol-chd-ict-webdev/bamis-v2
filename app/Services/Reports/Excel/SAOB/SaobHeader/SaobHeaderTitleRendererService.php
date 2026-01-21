<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\SaobHeader;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SaobHeaderTitleRendererService
{
    public function render(Worksheet $sheet, string $formattedDate): void
    {
        $sheet->setCellValue('B2', 'STATEMENT OF APPROPRIATIONS, ALLOTMENTS, OBLIGATIONS, DISBURSEMENTS AND BALANCES');
        $sheet->setCellValue('B3', 'As of '.$formattedDate);

        $sheet->getStyle('B2')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('B3')->getFont()->setBold(true)->setSize(14);

        $sheet->getStyle('B2:AS3')->applyFromArray([
            'alignment' => [
                'wrapText' => true,
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        $sheet->mergeCells('B2:AS2');
        $sheet->mergeCells('B3:AS3');
    }
}
