<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class FormulaBuilder
{
    private const array COLUMNS = ['C', 'D', 'E', 'G', 'H'];

    public function __construct(private int $row) {}

    public function setPercentageFormulas(Worksheet $sheet): void
    {
        $sheet->setCellValue('F'.$this->row, sprintf('=IF(C%d=0,0,D%d/C%d)', $this->row, $this->row, $this->row));
        $sheet->setCellValue('I'.$this->row, sprintf('=IF(D%d=0,0,G%d/D%d)', $this->row, $this->row, $this->row));
    }

    public function setSumFormulas(Worksheet $sheet, int $firstRow, int $lastRow): void
    {
        foreach (self::COLUMNS as $col) {
            $sheet->setCellValue(sprintf('%s%d', $col, $this->row), sprintf('=SUM(%s%d:%s%d)', $col, $firstRow, $col, $lastRow));
        }

        $this->setPercentageFormulas($sheet);
    }

    /**
     * @param  array<int, int>  $rows
     */
    public function setSumFormulasFromRows(Worksheet $sheet, array $rows): void
    {
        foreach (self::COLUMNS as $col) {
            $refs = implode('+', array_map(fn (int $r): string => $col.$r, $rows));
            $sheet->setCellValue(sprintf('%s%d', $col, $this->row), '='.$refs);
        }

        $this->setPercentageFormulas($sheet);
    }

    public function setGrandTotalFormulas(Worksheet $sheet, int $psRow, int $mooeRow, int $coRow): void
    {
        foreach (self::COLUMNS as $col) {
            $sheet->setCellValue(sprintf('%s%d', $col, $this->row), sprintf('=%s%d+%s%d+%s%d', $col, $psRow, $col, $mooeRow, $col, $coRow));
        }

        $this->setPercentageFormulas($sheet);
    }
}
