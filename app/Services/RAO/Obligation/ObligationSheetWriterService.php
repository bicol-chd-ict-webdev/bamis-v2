<?php

declare(strict_types=1);

namespace App\Services\RAO\Obligation;

use App\Models\Allocation;
use Brick\Math\BigDecimal;
use Carbon\CarbonImmutable;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ObligationSheetWriterService
{
    public function __construct(
        private readonly ObligationTransformerService $transformer,
        private readonly ObligationSheetFormatterService $formatter
    ) {}

    public function write(Worksheet $sheet, Allocation $allocation): void
    {
        $obligationArray = $this->transformer->transform($allocation);
        $allocationAmount = BigDecimal::of($allocation->amount)->toScale(2);

        // Header Row
        $value = $allocation->obligations->first()->series ?? '0000';
        $numericValue = (int) $value;
        $result = mb_str_pad((string) ($numericValue - 1), mb_strlen($value), '0', STR_PAD_LEFT);

        $allocationDateReceived = CarbonImmutable::parse($allocation->date_received);
        $orasPrefix = $this->buildPrefixBase($allocation, $allocationDateReceived);
        $orasNumberReference = "{$orasPrefix}-{$allocationDateReceived->format('m')}-{$result}";

        $sheet->setCellValue('A13', $value === '0002' ? $allocationDateReceived->format('F') : '');
        $sheet->setCellValue('B13', $value === '0002' ? $allocationDateReceived->format('m/d/Y') : '');
        $sheet->setCellValue('C13', $value === '0002' ? $orasNumberReference : '');
        $sheet->setCellValue('F13', $allocationAmount);
        $sheet->setCellValue('J13', '=F13');
        $sheet->setCellValue('K13', 0);
        $sheet->setCellValue('M13', '=I13-L13');

        $this->formatter->formatHeaderRow($sheet, 13);

        // Obligation Rows
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

    private function buildPrefixBase(Allocation $allocation, CarbonImmutable $date): string
    {
        $codeBase = match (true) {
            $allocation->appropriation_id === 1 => $allocation->lineItem?->acronym,
            $allocation->appropriation_id === 2 => $allocation->lineItem?->acronym.'-'.mb_substr((string) $allocation->saa_number, -4),
            default => $this->formatSaroNumber($allocation->saro_number),
        };

        $separator = $allocation->appropriation_type_id === 2 ? '(CA)' : '-';

        return sprintf(
            '%s%s%s-%s-%d',
            $codeBase,
            $separator,
            $allocation->allotmentClass?->code,
            $allocation->appropriationType?->code,
            $date->year
        );
    }

    private function formatSaroNumber(?string $saroNumber): string
    {
        if ($saroNumber !== null && $saroNumber !== '' && $saroNumber !== '0' && str_contains($saroNumber, '-')) {
            [, $number] = explode('-', $saroNumber, 2);

            return 'SARO-'.mb_ltrim($number, '0');
        }

        return 'SARO';
    }
}
