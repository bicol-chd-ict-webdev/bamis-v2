<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\ObjectDistribution;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final class ObjectDistributionRowBuilder
{
    private int $obligationStartCol = 14; // N

    private int $disbursementStartCol = 27; // AA

    public function __construct(
        private readonly ObjectDistributionFormulaService $formulaService,
        private readonly ObjectDistributionFormatterService $formatter,
    ) {}

    /**
     * @param array{
     *     name: string,
     *     code: int|string,
     *     gaa_conap: float|int,
     *     allotment_conap: float|int,
     *     saro: float|int,
     *     norsa: float|int,
     *     saa_transfer_to: float|int,
     *     saa_transfer_from: float|int,
     *     obligations: array<int, float|int>,
     *     disbursements: array<int, float|int>
     * } $distribution
     */
    public function build(Worksheet $sheet, array $distribution, int $row): void
    {
        $sheet->setCellValue("B{$row}", $distribution['name']);
        $sheet->setCellValue("C{$row}", $distribution['code']);
        $sheet->setCellValue("E{$row}", $distribution['gaa_conap']);
        $sheet->setCellValue("H{$row}", $distribution['allotment_conap']);
        $sheet->setCellValue("I{$row}", $distribution['saro']);
        $sheet->setCellValue("J{$row}", $distribution['norsa']);
        $sheet->setCellValue("K{$row}", $distribution['saa_transfer_to']);
        $sheet->setCellValue("L{$row}", $distribution['saa_transfer_from']);

        $this->formulaService->applyFormulas($sheet, $row);
        $this->writeObligations($sheet, $distribution['obligations'], $row);
        $this->writeDisbursements($sheet, $distribution['disbursements'], $row);
        $this->formatter->applyFormatting($sheet, $row);
    }

    /**
     * @param  array<int, float|int>  $obligations
     */
    private function writeObligations(Worksheet $sheet, array $obligations, int $row): void
    {
        $colIndex = $this->obligationStartCol;

        foreach ($obligations as $amount) {
            $col = Coordinate::stringFromColumnIndex($colIndex++);
            $sheet->setCellValue("{$col}{$row}", (float) $amount);
        }

        $sheet->setCellValue("Z{$row}", "=SUM(N{$row}:Y{$row})");
    }

    /**
     * @param  array<int, float|int>  $disbursements
     */
    private function writeDisbursements(Worksheet $sheet, array $disbursements, int $row): void
    {
        $colIndex = $this->disbursementStartCol;

        foreach ($disbursements as $amount) {
            $col = Coordinate::stringFromColumnIndex($colIndex++);
            $sheet->setCellValue("{$col}{$row}", (float) $amount);
        }

        $sheet->setCellValue("AM{$row}", "=SUM(AA{$row}:AL{$row})");
    }
}
