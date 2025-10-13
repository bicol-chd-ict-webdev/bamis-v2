<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Obligation;

use App\Models\Allocation;
use App\Services\Obligation\OrasNumberBuilderService;
use Brick\Math\BigDecimal;
use Carbon\CarbonImmutable;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

final readonly class ObligationSheetWriterService
{
    public function __construct(
        private ObligationTransformerService $transformer,
        private ObligationSheetFormatterService $formatter,
        private OrasNumberBuilderService $orasNumberBuilderService,
    ) {}

    public function write(Worksheet $sheet, Allocation $allocation): int
    {
        $obligationArray = $this->transformer->transform($allocation);
        $allocationAmount = BigDecimal::of($allocation->amount)->toScale(2);

        $value = $allocation->obligations->first()->series ?? '0001';
        $numericValue = (int) $value;
        $result = mb_str_pad((string) ($numericValue === 1 ? $numericValue : $numericValue - 1), 4, '0', STR_PAD_LEFT);

        $allocationDateReceived = CarbonImmutable::parse($allocation->date_received);
        $orasPrefix = $this->orasNumberBuilderService->build($allocation, $allocationDateReceived);
        $orasNumberReference = "{$orasPrefix}-{$allocationDateReceived->format('m')}-{$result}";

        $sheet->setCellValue('A12', $allocationDateReceived->format('F'));
        $sheet->setCellValue('B12', $allocationDateReceived->format('m/d/Y'));
        $sheet->setCellValue('C12', $orasNumberReference);
        $sheet->setCellValue('F12', $allocationAmount);
        $sheet->setCellValue('J12', '=F12');
        $sheet->setCellValue('K12', 0);
        $sheet->setCellValue('M12', '=I12-L12');

        $this->formatter->formatHeaderRow($sheet, 12);

        $row = 13;
        foreach ($obligationArray as $obligation) {
            $sheet->setCellValue("A{$row}", $obligation['date']);
            $sheet->setCellValue("B{$row}", $obligation['oras_date']);
            $sheet->setCellValue("C{$row}", $obligation['oras_number']);
            $sheet->setCellValue("E{$row}", $obligation['uacs_code']);
            $sheet->setCellValue("F{$row}", $obligation['allotment']);
            $sheet->setCellValue("G{$row}", $obligation['creditor']);
            $sheet->setCellValue("H{$row}", $obligation['particulars']);
            $sheet->setCellValue("I{$row}", $obligation['obligation']);
            $sheet->setCellValue("J{$row}", '=J'.($row - 1)."-I{$row}+F{$row}");
            $sheet->setCellValue("K{$row}", $obligation['disbursement']);
            $sheet->setCellValue("L{$row}", $obligation['due_and_demandable']);
            $sheet->setCellValue("M{$row}", "=I{$row}-L{$row}-K{$row}");

            if ($obligation['is_cancelled']) {
                $sheet->getStyle("G{$row}:H{$row}")->getFont()
                    ->getColor()->setARGB('FF0000');
            }

            $this->formatter->formatObligationRow($sheet, $row);
            $row++;
        }

        return $row - 1;
    }
}
