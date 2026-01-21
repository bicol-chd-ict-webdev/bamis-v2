<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class BurHeaderRendererService
{
    public function render(Worksheet $sheet, int $year, string $formattedDate): void
    {
        $this->writeTitles($sheet, $year, $formattedDate);
        $this->applyStyles($sheet);
        $this->setColumnWidths($sheet);
        $this->setRowHeights($sheet);
        $this->mergeCells($sheet);
        $this->applyFormatting($sheet);
    }

    private function writeTitles(Worksheet $sheet, int $year, string $formattedDate): void
    {
        $sheet->setCellValue('A1', 'DOH Bicol CHD, Legazpi City');
        $sheet->setCellValue('A2', sprintf('FY %d Budget Utilization Report', $year));
        $sheet->setCellValue('A3', 'as of '.$formattedDate);

        $sheet->getStyle('A1:A3')->getFont()->setBold(true)->setSize(14);

        $headers = [
            'A4' => 'Division/ Cluster/ Unit/ Section',
            'C4' => 'Code',
            'D4' => 'Allotment Class',
            'E4' => 'GRAND TOTAL (Current and Continuing Appropriations)',
            'E6' => 'Allotment',
            'F6' => 'Obligation',
            'G6' => 'Disbursement',
            'H6' => 'Unobligated Balances',
            'I6' => 'Unpaid Obligations',
            'J6' => '%ObUR',
            'K6' => '%DisUR',
            'L4' => 'Fund Source',
            'L5' => 'GAA CURRENT',
            'L6' => 'Allotment',
            'M6' => 'Obligation',
            'N6' => 'Disbursement',
            'O6' => 'Unobligated Balances',
            'P6' => 'Unpaid Obligations',
            'Q6' => '%ObUR',
            'R6' => '%DisUR',
            'S4' => 'Fund Source',
            'S5' => 'SAA CURRENT',
            'S6' => 'Allotment',
            'T6' => 'Obligation',
            'U6' => 'Disbursement',
            'V6' => 'Unobligated Balances',
            'W6' => 'Unpaid Obligations',
            'X6' => '%ObUR',
            'Y6' => '%DisUR',
            'Z4' => 'Fund Source',
            'Z5' => 'SARO CURRENT',
            'Z6' => 'Allotment',
            'AA6' => 'Obligation',
            'AB6' => 'Disbursement',
            'AC6' => 'Unobligated Balances',
            'AD6' => 'Unpaid Obligations',
            'AE6' => '%ObUR',
            'AF6' => '%DisUR',
            'AG4' => 'Fund Source',
            'AG5' => 'GAA CONAP',
            'AG6' => 'Allotment',
            'AH6' => 'Obligation',
            'AI6' => 'Disbursement',
            'AJ6' => 'Unobligated Balances',
            'AK6' => 'Unpaid Obligations',
            'AL6' => '%ObUR',
            'AM6' => '%DisUR',
            'AN4' => 'Fund Source',
            'AN5' => 'SAA CONAP',
            'AN6' => 'Allotment',
            'AO6' => 'Obligation',
            'AP6' => 'Disbursement',
            'AQ6' => 'Unobligated Balances',
            'AR6' => 'Unpaid Obligations',
            'AS6' => '%ObUR',
            'AT6' => '%DisUR',
            'AV4' => 'Fund Source',
            'AV5' => 'CURRENT APPROPRIATIONS',
            'AV6' => 'Allotment',
            'AW6' => 'Obligation',
            'AX6' => 'Disbursement',
            'AY6' => 'Unobligated Balances',
            'AZ6' => 'Unpaid Obligations',
            'BA6' => '%ObUR',
            'BB6' => '%DisUR',
            'BD4' => 'Fund Source',
            'BD5' => 'CONTINUING APPROPRIATIONS',
            'BD6' => 'Allotment',
            'BE6' => 'Obligation',
            'BF6' => 'Disbursement',
            'BG6' => 'Unobligated Balances',
            'BH6' => 'Unpaid Obligations',
            'BI6' => '%ObUR',
            'BJ6' => '%DisUR',
        ];

        foreach ($headers as $cell => $value) {
            $sheet->setCellValue($cell, $value);
        }
    }

    private function applyStyles(Worksheet $sheet): void
    {
        $sheet->getStyle('A4:BJ6')->getFont()->setBold(true)->setSize(12);
        $sheet->getStyle('E6:BJ6')->getFont()->setSize(11);

        $sheet->getStyle('A4:BJ6')->applyFromArray([
            'alignment' => [
                'wrapText' => true,
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        $sheet->getStyle('A4:BJ6')->getFill()
            ->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('DBE9F7');
    }

    private function setColumnWidths(Worksheet $sheet): void
    {
        $widths = [
            'A' => 14, 'B' => 14, 'C' => 14, 'D' => 14, 'E' => 18, 'F' => 19, 'G' => 17, 'H' => 20,
            'I' => 19, 'J' => 12, 'K' => 11, 'L' => 18, 'M' => 19, 'N' => 17, 'O' => 20, 'P' => 19,
            'Q' => 12, 'R' => 11, 'S' => 18, 'T' => 19, 'U' => 17, 'V' => 20, 'W' => 19, 'X' => 12,
            'Y' => 11, 'Z' => 18, 'AA' => 19, 'AB' => 17, 'AC' => 20, 'AD' => 19, 'AE' => 12, 'AF' => 11,
            'AG' => 18, 'AH' => 19, 'AI' => 17, 'AJ' => 20, 'AK' => 19, 'AL' => 12, 'AM' => 11, 'AN' => 18,
            'AO' => 19, 'AP' => 17, 'AQ' => 20, 'AR' => 19, 'AS' => 12, 'AT' => 11, 'AV' => 18, 'AW' => 19,
            'AX' => 17, 'AY' => 20, 'AZ' => 19, 'BA' => 12, 'BB' => 11, 'BD' => 18, 'BE' => 19, 'BF' => 17,
            'BG' => 20, 'BH' => 19, 'BI' => 12, 'BJ' => 11,
        ];

        foreach ($widths as $col => $width) {
            $sheet->getColumnDimension($col)->setWidth($width);
        }
    }

    private function setRowHeights(Worksheet $sheet): void
    {
        $sheet->getRowDimension(6)->setRowHeight(28.8);
    }

    private function mergeCells(Worksheet $sheet): void
    {
        $merges = [
            'A4:B6', 'C4:C6', 'D4:D6', 'E4:K5', 'L4:R4', 'L5:R5', 'S4:Y4', 'S5:Y5', 'Z4:AF4', 'Z5:AF5',
            'AG4:AM4', 'AG5:AM5', 'AN4:AT4', 'AN5:AT5', 'AV4:BB4', 'AV5:BB5', 'BD4:BJ4', 'BD5:BJ5',
        ];

        foreach ($merges as $range) {
            $sheet->mergeCells($range);
        }
    }

    private function applyFormatting(Worksheet $sheet): void
    {
        $columnNumbers = [
            'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P',
            'S', 'T', 'U', 'V', 'W', 'Z', 'AA', 'AB', 'AC', 'AD',
            'AG', 'AH', 'AI', 'AJ', 'AK', 'AN', 'AO', 'AP', 'AQ', 'AR',
            'AV', 'AW', 'AX', 'AY', 'AZ', 'BD', 'BE', 'BF', 'BG', 'BH',
        ];

        $columnPercentages = [
            'J', 'K', 'Q', 'R',
            'X', 'Y', 'AE', 'AF',
            'AL', 'AM', 'AS', 'AT',
            'BA', 'BB', 'BI', 'BJ',
        ];

        foreach ($columnNumbers as $columnNumber) {
            $sheet->getStyle(sprintf('%s:%s', $columnNumber, $columnNumber))
                ->getNumberFormat()->setFormatCode('#,##0.00');
        }

        foreach ($columnPercentages as $columnPercentage) {
            $sheet->getStyle(sprintf('%s:%s', $columnPercentage, $columnPercentage))
                ->getNumberFormat()
                ->setFormatCode(NumberFormat::FORMAT_PERCENTAGE);
        }
    }
}
