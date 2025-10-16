<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\SaobHeader;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SaobHeaderColumnConfigurerService
{
    public function configure(Worksheet $sheet): void
    {
        $widths = [
            'B' => 32, 'C' => 19, 'E' => 18, 'F' => 18, 'G' => 18, 'H' => 18,
            'I' => 15, 'J' => 15, 'K' => 15, 'L' => 18, 'M' => 18, 'Z' => 16,
            'AM' => 16, 'AN' => 16, 'AO' => 17.44, 'AP' => 15.11, 'AQ' => 18,
            'AR' => 14.22, 'AS' => 14.55,
        ];

        foreach ($widths as $col => $width) {
            $sheet->getColumnDimension($col)->setWidth($width);
        }

        foreach (range(14, 25) as $i) {
            $col = Coordinate::stringFromColumnIndex($i);
            $sheet->getColumnDimension($col)->setWidth(16);
        }

        foreach (range(27, 39) as $i) {
            $col = Coordinate::stringFromColumnIndex($i);
            $sheet->getColumnDimension($col)->setWidth(16);
        }

        $sheet->getColumnDimension('A')->setVisible(false);
        $sheet->getColumnDimension('D')->setVisible(false);

        $sheet->getRowDimension(11)->setRowHeight(32);
        $sheet->getRowDimension(12)->setRowHeight(46);
    }
}
