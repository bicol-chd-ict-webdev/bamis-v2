<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\Signatory;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class SignatoryRendererService
{
    /**
     * @param  list<array{label: string, name: string, position: string, column: string}>  $signatories
     */
    public function render(Worksheet $sheet, int &$row, array $signatories): void
    {
        $row++;

        foreach ($signatories as $signatory) {
            $col = (string) $signatory['column'];
            $sheet->setCellValue(sprintf('%s%d', $col, $row), $signatory['label']);
        }

        $sheet->getStyle(sprintf('B%d:Z%d', $row, $row))->getFont()->setSize(14);

        $row += 4;

        foreach ($signatories as $signatory) {
            $col = (string) $signatory['column'];
            $sheet->setCellValue(sprintf('%s%d', $col, $row), $signatory['name']);
        }

        $sheet->getStyle(sprintf('B%d:Z%d', $row, $row))->getFont()->setBold(true)->setSize(14);

        $row++;

        foreach ($signatories as $signatory) {
            $col = (string) $signatory['column'];
            $sheet->setCellValue(sprintf('%s%d', $col, $row), $signatory['position']);
        }

        $sheet->getStyle(sprintf('B%d:Z%d', $row, $row))->getFont()->setSize(14);
    }
}
