<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO;

use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class RaoHeaderRendererService
{
    public function render(
        Worksheet $sheet,
        string $lineItem,
        string $allotmentClassAcronym,
        int $year,
        ?string $saaSaroNumber,
        string $entityName = 'DOH BICOL CHD',
        string $fundCluster = '01',
        string $legalBasisPrefix = 'GAA RA 12116',
    ): void {
        $this->setHeaderValues($sheet, $lineItem, $allotmentClassAcronym, $year, $saaSaroNumber, $entityName, $fundCluster, $legalBasisPrefix);
        $this->applyHeaderStyles($sheet);
        $this->mergeHeaderCells($sheet);
    }

    private function setHeaderValues(
        Worksheet $sheet,
        string $lineItem,
        string $allotmentClassAcronym,
        int $year,
        ?string $saaSaroNumber,
        string $entityName,
        string $fundCluster,
        string $legalBasisPrefix,
    ): void {
        $sheet->setCellValue('A1', 'REGISTRY OF ALLOTMENTS, OBLIGATIONS AND DISBURSEMENTS');
        $sheet->setCellValue('A2', $lineItem);
        $sheet->setCellValue('A3', $allotmentClassAcronym);
        $sheet->setCellValue('A4', "For the year {$year}");
        $sheet->setCellValue('A6', 'Entity Name:');
        $sheet->setCellValue('B6', $entityName);
        $sheet->setCellValue('A7', 'Fund Cluster:');
        $sheet->setCellValue('B7', $fundCluster);
        $sheet->setCellValue('A8', 'Legal Basis');
        $sheet->setCellValue('B8', "FY {$year} {$legalBasisPrefix}");
        $sheet->setCellValue('A5', $saaSaroNumber);
        $sheet->setCellValue('I6', 'MFO/PAP:');
        $sheet->setCellValue('I7', 'Sheet No.:');
    }

    private function applyHeaderStyles(Worksheet $sheet): void
    {
        // Alignment
        $sheet->getStyle('A1:A5')->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Fonts
        $this->applyFontStyle($sheet, 'A1', true, 14);
        $this->applyFontStyle($sheet, 'A2', true, 12);
        $this->applyFontStyle($sheet, 'A3', true, 11);
        $this->applyFontStyle($sheet, 'A4', true, 12);

        $smallCells = ['A6', 'A7', 'A8', 'B6', 'B7', 'B8', 'I6', 'I7'];
        foreach ($smallCells as $cell) {
            $this->applyFontStyle($sheet, $cell, true, 9);
        }
    }

    private function applyFontStyle(Worksheet $sheet, string $cell, bool $bold, int $size): void
    {
        $sheet->getStyle($cell)
            ->getFont()
            ->setBold($bold)
            ->setName('Times New Roman')
            ->setSize($size);
    }

    private function mergeHeaderCells(Worksheet $sheet): void
    {
        $sheet->mergeCells('A1:M1');
        $sheet->mergeCells('A2:M2');
        $sheet->mergeCells('A3:M3');
        $sheet->mergeCells('A4:M4');
        $sheet->mergeCells('A5:M5');
    }
}
