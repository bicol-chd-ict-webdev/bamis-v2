<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\AccountsPayable;

use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class HeaderRendererService
{
    private const array MONTH_FIELDS = [
        'CHECK NO.',
        'CHECK DATE',
        'NET (108)',
        'W/ TAX (412-14)',
        'RETENTION (439)',
        'PENALTY (411)',
        'OTHER DEDUCTION',
        'ABSENCES',
        'TOTAL AMT',
        'AP',
        'REMARKS',
    ];

    private const array FIELD_WIDTHS = [
        'CHECK NO.' => 15,
        'CHECK DATE' => 11,
        'NET (108)' => 18,
        'W/ TAX (412-14)' => 18,
        'RETENTION (439)' => 18,
        'PENALTY (411)' => 18,
        'OTHER DEDUCTION' => 18,
        'ABSENCES' => 18,
        'TOTAL AMT' => 20,
        'AP' => 20,
        'REMARKS' => 20,
    ];

    public function render(Worksheet $sheet, string $date): void
    {
        $this->setHeaderValues($sheet, $date);
    }

    private function setHeaderValues(Worksheet $sheet, string $date): void
    {
        $parsedDate = CarbonImmutable::parse($date);
        $reportYear = $parsedDate->format('Y');

        // Static headers (non-repeating)
        $staticHeaders = [
            'A1' => ['PERSON RESPONSIBLE', 'A1:A2'],
            'B1' => ['CATEGORY', 'B1:B2'],
            'C1' => ['MONTH', 'C1:C2'],
            'D1' => ['DATE', 'D1:D2'],
            'E1' => ['ORAS NUMBER', 'E1:E2'],
            'F1' => ['ACCOUNTS CODE', 'F1:F2'],
            'G1' => ['NEW ACCOUNT CODE', 'G1:G2'],
            'H1' => ['ALLOTMENT/SAA TO OUS', 'H1:H2'],
            'I1' => ['CREDITOR', 'I1:I2'],
            'J1' => ['PARTICULARS', 'J1:J2'],
            'K1' => ['OBLIGATION', 'K1:K2'],
            'ER1' => ['TOTAL DISBURSEMENTS', 'ER1:ER2'],
            'ES1' => ['WFP CODE (3)', 'ES1:ES2'],
            'ET1' => ['DIVISION/SECTION CODE', 'ET1:ET2'],
            'EU1' => ['TOTAL OBLIGATION', 'EU1:EU2'],
            'EV1' => ['TOTAL DISBURSEMENT', 'EV1:EV2'],
            'EW1' => ['SAA Current (Obligations)', 'EW1:EW2'],
            'EX1' => ['SAA Current (Disbursement)', 'EX1:EX2'],
            'EY1' => ['SARO Current (Obligations)', 'EY1:EY2'],
            'EZ1' => ['SARO Current (Disbursement)', 'EZ1:EZ2'],
            'FA1' => ['SAA Conap (Obligations)', 'FA1:FA2'],
            'FB1' => ['SAA Conap (Disbursement)', 'FB1:FB2'],
            'FC1' => ['GAA Conap (Obligations)', 'FC1:FC2'],
            'FD1' => ['GAA Conap (Disbursement)', 'FD1:FD2'],
            'FE1' => ['GAA Current (Obligations)', 'FE1:FE2'],
            'FF1' => ['GAA Current (Disbursement)', 'FF1:FF2'],
        ];

        foreach ($staticHeaders as $cell => [$label, $mergeRange]) {
            $sheet->setCellValue($cell, $label);
            $sheet->mergeCells($mergeRange);
        }

        $sheet->getColumnDimension('A')->setWidth(15);
        $sheet->getColumnDimension('B')->setWidth(16);
        $sheet->getColumnDimension('C')->setWidth(11);
        $sheet->getColumnDimension('D')->setWidth(9);
        $sheet->getColumnDimension('E')->setWidth(39);
        $sheet->getColumnDimension('F')->setWidth(4);
        $sheet->getColumnDimension('G')->setWidth(13);
        $sheet->getColumnDimension('H')->setWidth(8);
        $sheet->getColumnDimension('I')->setWidth(30);
        $sheet->getColumnDimension('J')->setWidth(25);
        $sheet->getColumnDimension('K')->setWidth(20);
        $sheet->getColumnDimension('ER')->setWidth(30);
        $sheet->getColumnDimension('ES')->setWidth(21);
        $sheet->getColumnDimension('ET')->setWidth(11);
        $sheet->getColumnDimension('EU')->setWidth(20);
        $sheet->getColumnDimension('EV')->setWidth(20);
        $sheet->getColumnDimension('EW')->setWidth(18);
        $sheet->getColumnDimension('EX')->setWidth(18);
        $sheet->getColumnDimension('EY')->setWidth(18);
        $sheet->getColumnDimension('EZ')->setWidth(18);
        $sheet->getColumnDimension('FA')->setWidth(18);
        $sheet->getColumnDimension('FB')->setWidth(18);
        $sheet->getColumnDimension('FC')->setWidth(18);
        $sheet->getColumnDimension('FD')->setWidth(18);
        $sheet->getColumnDimension('FE')->setWidth(18);
        $sheet->getColumnDimension('FF')->setWidth(18);

        // Dynamically generate month names
        $months = collect(range(1, 12))
            ->map(fn (int $month): string => CarbonImmutable::create((int) $reportYear, $month, 1)?->format('F') ?? '');

        $startColumnIndex = 12; // Column L

        /** @var Collection<int, string> $months */
        foreach ($months as $i => $month) {
            $endColumnIndex = $startColumnIndex + count(self::MONTH_FIELDS) - 1;
            $startColumnLetter = Coordinate::stringFromColumnIndex($startColumnIndex);
            $endColumnLetter = Coordinate::stringFromColumnIndex($endColumnIndex);

            // Month header (row 1)
            $sheet->setCellValue($startColumnLetter.'1', mb_strtoupper($month));
            $sheet->mergeCells(sprintf('%s1:%s1', $startColumnLetter, $endColumnLetter));

            // Month sub-headers (row 2)
            $fieldIndex = 0;
            foreach (self::MONTH_FIELDS as $field) {
                $columnLetter = Coordinate::stringFromColumnIndex($startColumnIndex + $fieldIndex);
                $sheet->setCellValue($columnLetter.'2', $field);

                $width = self::FIELD_WIDTHS[$field];
                $sheet->getColumnDimension($columnLetter)->setWidth($width);

                $fieldIndex++;
            }

            $startColumnIndex = $endColumnIndex + 1;

            // Add Quarterly column every 3 months
            if (($i + 1) % 3 === 0) {
                $quarterNumber = intdiv($i + 1, 3);
                $quarterLabel = match ($quarterNumber) {
                    1 => '1st Quarter Payments',
                    2 => '2nd Quarter Payments',
                    3 => '3rd Quarter Payments',
                    4 => '4th Quarter Payments',
                    default => $quarterNumber.'th Quarter Payments',
                };

                $columnLetter = Coordinate::stringFromColumnIndex($startColumnIndex);
                $sheet->setCellValue($columnLetter.'1', $quarterLabel);
                $sheet->getColumnDimension($columnLetter)->setWidth(15);
                $sheet->mergeCells(sprintf('%s1:%s2', $columnLetter, $columnLetter));
                $startColumnIndex++;
            }
        }

        $lastColumnIndex = $sheet->getHighestColumn(); // e.g. "BZ"
        $sheet->getStyle(sprintf('A1:%s2', $lastColumnIndex))->applyFromArray([
            'font' => [
                'bold' => true,
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                ],
            ],
        ]);
    }
}
