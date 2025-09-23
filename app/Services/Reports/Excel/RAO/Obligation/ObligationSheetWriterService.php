<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Obligation;

use App\Models\Allocation;
use App\Services\Obligation\OrasNumberBuilderService;
use Brick\Math\BigDecimal;
use Carbon\CarbonImmutable;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ObligationSheetWriterService
{
    public function __construct(
        private readonly ObligationTransformerService $transformer,
        private readonly ObligationSheetFormatterService $formatter,
        private readonly OrasNumberBuilderService $orasNumberBuilderService,
    ) {}

    public function write(Worksheet $sheet, Allocation $allocation): void
    {
        $obligationArray = $this->transformer->transform($allocation);
        $allocationAmount = BigDecimal::of($allocation->amount)->toScale(2);

        $value = $allocation->obligations->first()->series ?? '0000';
        $numericValue = (int) $value;
        $result = mb_str_pad((string) ($numericValue - 1), mb_strlen($value), '0', STR_PAD_LEFT);

        $allocationDateReceived = CarbonImmutable::parse($allocation->date_received);
        $orasPrefix = $this->orasNumberBuilderService->build($allocation, $allocationDateReceived);
        $orasNumberReference = "{$orasPrefix}-{$allocationDateReceived->format('m')}-{$result}";

        $sheet->setCellValue('A13', $value === '0002' ? $allocationDateReceived->format('F') : '');
        $sheet->setCellValue('B13', $value === '0002' ? $allocationDateReceived->format('m/d/Y') : '');
        $sheet->setCellValue('C13', $value === '0002' ? $orasNumberReference : '');
        $sheet->setCellValue('F13', $allocationAmount);
        $sheet->setCellValue('J13', '=F13');
        $sheet->setCellValue('K13', 0);
        $sheet->setCellValue('M13', '=I13-L13');

        $this->formatter->formatHeaderRow($sheet, 13);

        $row = 14;
        foreach ($obligationArray as $obligation) {
            $sheet->setCellValue("A{$row}", $obligation['date']);
            $sheet->setCellValue("B{$row}", $obligation['oras_date']);
            $sheet->setCellValue("C{$row}", $obligation['oras_number']);
            $sheet->setCellValue("E{$row}", $obligation['uacs_code']);
            $sheet->setCellValue("F{$row}", $obligation['allotment']);
            $sheet->setCellValue("G{$row}", $obligation['creditor']);
            $sheet->setCellValue("H{$row}", $obligation['particulars']);
            $sheet->setCellValue("I{$row}", $obligation['obligation']);
            $sheet->setCellValue("J{$row}", '=J'.($row - 1)."-I{$row}");
            $sheet->setCellValue("K{$row}", $obligation['disbursement']);
            $sheet->setCellValue("M{$row}", "=I{$row}-L{$row}-K{$row}");

            $this->formatter->formatObligationRow($sheet, $row);
            $row++;
        }
    }
}
