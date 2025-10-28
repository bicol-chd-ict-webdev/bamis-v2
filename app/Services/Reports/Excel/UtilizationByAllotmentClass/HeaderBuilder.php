<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

use Carbon\CarbonImmutable;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

final readonly class HeaderBuilder
{
    private const COLUMN_WIDTHS = [
        'A' => 12, 'B' => 30, 'C' => 21, 'D' => 19, 'E' => 20, 'F' => 14, 'G' => 19, 'H' => 17, 'I' => 14,
    ];

    private const HEADERS = [
        'A5' => 'Allotment Class',
        'C5' => 'Allotment',
        'D5' => 'Obligation',
        'E5' => 'Unpaid Balances',
        'F5' => '%ObUR',
        'G5' => 'Disbursement',
        'H5' => 'Unpaid Obligations',
        'I5' => '%DisUR',
    ];

    public function __construct(private ReportStyler $styler) {}

    public function build($sheet, string $date): void
    {
        $this->setTitle($sheet, $date);
        $this->setColumnHeaders($sheet);
        $this->setColumnWidths($sheet);
        $this->setNumberFormats($sheet);
    }

    private function setTitle($sheet, string $date): void
    {
        $formattedDate = CarbonImmutable::parse($date)->format('F d, Y');

        $sheet->setCellValue('A1', 'DOH Bicol CHD, Legazpi City');
        $sheet->setCellValue('A2', 'Budget Utilization Report by Allotment Class');
        $sheet->setCellValue('A3', "for the period ending {$formattedDate}");

        $sheet->getStyle('A1:A3')->getFont()->setBold(true);
    }

    private function setColumnHeaders($sheet): void
    {
        foreach (self::HEADERS as $cell => $value) {
            $sheet->setCellValue($cell, $value);
        }

        $sheet->mergeCells('A5:B5');
        $this->styler->applyHeaderStyle($sheet, 'A5:I5');
    }

    private function setColumnWidths($sheet): void
    {
        foreach (self::COLUMN_WIDTHS as $column => $width) {
            $sheet->getColumnDimension($column)->setWidth($width);
        }
    }

    private function setNumberFormats($sheet): void
    {
        $currencyColumns = ['C', 'D', 'E', 'G', 'H'];
        foreach ($currencyColumns as $col) {
            $sheet->getStyle($col)->getNumberFormat()->setFormatCode('#,##0.00');
        }

        $percentColumns = ['F', 'I'];
        foreach ($percentColumns as $col) {
            $sheet->getStyle($col)->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);
        }
    }
}
