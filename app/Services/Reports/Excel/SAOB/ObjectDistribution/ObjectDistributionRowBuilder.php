<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\SAOB\ObjectDistribution;

use App\Services\Reports\Excel\SAOB\AllocationGrouper;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

/**
 * @phpstan-import-type SAOBObjectDistribution from AllocationGrouper
 */
final class ObjectDistributionRowBuilder
{
    private int $obligationStartCol = 14; // N

    private int $disbursementStartCol = 27; // AA

    public function __construct(
        private readonly ObjectDistributionFormulaService $formulaService,
        private readonly ObjectDistributionFormatterService $formatter,
    ) {}

    /**
     * @param  SAOBObjectDistribution  $distribution
     */
    public function build(Worksheet $sheet, array $distribution, int $row): void
    {
        $sheet->setCellValue('B'.$row, $distribution['name']);
        $sheet->setCellValue('C'.$row, $distribution['code']);
        $sheet->setCellValue('E'.$row, $distribution['gaa_conap']);
        $sheet->setCellValue('H'.$row, $distribution['allotment_conap']);
        $sheet->setCellValue('I'.$row, $distribution['saro']);
        $sheet->setCellValue('J'.$row, $distribution['norsa']);
        $sheet->setCellValue('K'.$row, $distribution['saa_transfer_to']);
        $sheet->setCellValue('L'.$row, $distribution['saa_transfer_from']);

        $this->formulaService->applyFormulas($sheet, $row);
        $this->writeObligations($sheet, $distribution['obligations'], $row);
        $this->writeDisbursements($sheet, $distribution['disbursements'], $row);
        $this->formatter->applyFormatting($sheet, $row);
    }

    /**
     * @param  array<int, float|int|string>  $obligations
     */
    private function writeObligations(Worksheet $sheet, array $obligations, int $row): void
    {
        $colIndex = $this->obligationStartCol;

        foreach ($obligations as $amount) {
            $col = Coordinate::stringFromColumnIndex($colIndex++);
            $sheet->setCellValue(sprintf('%s%d', $col, $row), (float) $amount);
        }

        $sheet->setCellValue('Z'.$row, sprintf('=SUM(N%d:Y%d)', $row, $row));
    }

    /**
     * @param  array<int, float|int|string>  $disbursements
     */
    private function writeDisbursements(Worksheet $sheet, array $disbursements, int $row): void
    {
        $colIndex = $this->disbursementStartCol;

        foreach ($disbursements as $amount) {
            $col = Coordinate::stringFromColumnIndex($colIndex++);
            $sheet->setCellValue(sprintf('%s%d', $col, $row), (float) $amount);
        }

        $sheet->setCellValue('AM'.$row, sprintf('=SUM(AA%d:AL%d)', $row, $row));
    }
}
