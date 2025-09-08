<?php

declare(strict_types=1);

namespace App\Services\Excel\Signatory;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SignatoryRendererService
{
    /**
     * @param  list<array{label: string, name: string, position: string, column: string}>  $signatories
     */
    public function render(Worksheet $sheet, int &$row, array $signatories): void
    {
        $row++;

        foreach ($signatories as $signatory) {
            $col = (string) $signatory['column'];
            $sheet->setCellValue("{$col}{$row}", $signatory['label']);
        }
        $sheet->getStyle("B{$row}:Z{$row}")->getFont()->setSize(14);

        $row += 4;

        foreach ($signatories as $signatory) {
            $col = (string) $signatory['column'];
            $sheet->setCellValue("{$col}{$row}", $signatory['name']);
        }
        $sheet->getStyle("B{$row}:Z{$row}")->getFont()->setBold(true)->setSize(14);

        $row++;

        foreach ($signatories as $signatory) {
            $col = (string) $signatory['column'];
            $sheet->setCellValue("{$col}{$row}", $signatory['position']);
        }
        $sheet->getStyle("B{$row}:Z{$row}")->getFont()->setSize(14);
    }
}
