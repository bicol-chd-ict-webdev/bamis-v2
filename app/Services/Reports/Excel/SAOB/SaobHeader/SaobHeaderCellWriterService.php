<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\SaobHeader;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SaobHeaderCellWriterService
{
    public function write(Worksheet $sheet, int $year, int $prevYear): void
    {
        $sheet->setCellValue('B11', 'P/A/P/ ALLOTMENT CLASS/OBJECT OF EXPENDITURE');
        $sheet->setCellValue('C11', 'EXPENSES CODE');
        $sheet->setCellValue('E11', "GAA {$year} / CONAP BALANCE {$prevYear}");
        $sheet->setCellValue('F11', 'WITHIN DEPARTMENT');
        $sheet->setCellValue('G11', 'TOTAL ADJUSTED APPROPRIATION');
        $sheet->setCellValue('H11', "ALLOTMENT RECEIVED FY {$year} /CONAP BALANCE {$prevYear}");
        $sheet->setCellValue('I11', "ADDITIONAL SARO CY {$year}");
        $sheet->setCellValue('J11', 'REALIGNMENT/ NORSA');
        $sheet->setCellValue('K11', "SAA TRANSFER TO CO/OU'S CY {$year}");
        $sheet->setCellValue('L11', "SAA TRANSFER FROM CO/CHD CY {$year}");
        $sheet->setCellValue('M11', 'TOTAL ADJUSTED ALLOTMENT');

        $this->writeMonthly('N', 'OBLIGATIONS', $sheet);
        $this->writeMonthly('AA', 'DISBURSEMENTS', $sheet);

        $sheet->setCellValue('AN11', 'UNRELEASED APPROPRIATION');
        $sheet->setCellValue('AO11', 'UNOBLIGATED BALANCE OF ALLOTMENT');
        $sheet->setCellValue('AP11', 'UNPAID OBLIGATIONS');
        $sheet->setCellValue('AP12', 'DUE AND DEMANDABLE');
        $sheet->setCellValue('AQ12', 'NOT YET DUE AND DEMANDABLE');
        $sheet->setCellValue('AR11', 'PERCENTAGE RATE');
        $sheet->setCellValue('AR12', 'OBLIGATION');
        $sheet->setCellValue('AS12', 'DISBURSEMENT');
    }

    private function writeMonthly(string $startCol, string $label, Worksheet $sheet): void
    {
        $months = [
            'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
            'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER', "TOTAL {$label}",
        ];

        $sheet->setCellValue("{$startCol}11", $label);
        $startIdx = Coordinate::columnIndexFromString($startCol);

        foreach ($months as $i => $monthLabel) {
            $col = Coordinate::stringFromColumnIndex($startIdx + $i);
            $sheet->setCellValue("{$col}12", "THIS REPORT {$monthLabel}");
        }
    }
}
