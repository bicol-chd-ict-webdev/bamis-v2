<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\UtilizationByAllotmentClass;

final readonly class FormulaBuilder
{
    private const COLUMNS = ['C', 'D', 'E', 'G', 'H'];

    public function __construct(private int $row) {}

    public function setPercentageFormulas($sheet): void
    {
        $sheet->setCellValue("F{$this->row}", "=IF(C{$this->row}=0,0,D{$this->row}/C{$this->row})");
        $sheet->setCellValue("I{$this->row}", "=IF(D{$this->row}=0,0,G{$this->row}/D{$this->row})");
    }

    public function setSumFormulas($sheet, int $firstRow, int $lastRow): void
    {
        foreach (self::COLUMNS as $col) {
            $sheet->setCellValue("{$col}{$this->row}", "=SUM({$col}{$firstRow}:{$col}{$lastRow})");
        }
        $this->setPercentageFormulas($sheet);
    }

    public function setSumFormulasFromRows($sheet, array $rows): void
    {
        foreach (self::COLUMNS as $col) {
            $refs = implode('+', array_map(fn ($r): string => "{$col}{$r}", $rows));
            $sheet->setCellValue("{$col}{$this->row}", "={$refs}");
        }
        $this->setPercentageFormulas($sheet);
    }

    public function setGrandTotalFormulas($sheet, int $psRow, int $mooeRow, int $coRow): void
    {
        foreach (self::COLUMNS as $col) {
            $sheet->setCellValue("{$col}{$this->row}", "={$col}{$psRow}+{$col}{$mooeRow}+{$col}{$coRow}");
        }
        $this->setPercentageFormulas($sheet);
    }
}
