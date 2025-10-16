<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\SaobHeader;

use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SaobHeaderMetaRendererService
{
    public function render(Worksheet $sheet): void
    {
        $sheet->setCellValue('B5', 'DEPARTMENT:');
        $sheet->setCellValue('C5', 'DEPARTMENT OF HEALTH (DOH)');
        $sheet->setCellValue('B6', 'AGENCY:');
        $sheet->setCellValue('C6', 'OFFICE OF THE SECRETARY');
        $sheet->setCellValue('B7', 'OPERATING UNIT:');
        $sheet->setCellValue('C7', 'BICOL CENTER FOR HEALTH DEVELOPMENT');
        $sheet->setCellValue('B8', 'ORGANIZATION CODE (UACS):');
        $sheet->setCellValueExplicit('C8', '130010000000', DataType::TYPE_NUMERIC);
        $sheet->setCellValue('B9', 'FUND CLUSTER:');
        $sheet->setCellValue('C9', '01 REGULAR AGENCY FUND, 04 SPECIAL ACCOUNTS/FOREIGN ASSISTED, 05 UNPROGRAMMED FUNDS');

        $sheet->getStyle('C8')->getNumberFormat()->setFormatCode('###0');
        $sheet->getStyle('C8')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
        $sheet->getStyle('B5:C9')->getFont()->setBold(true)->setSize(13);
    }
}
