<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\RAO\Summary;

final class SummaryFormulaBuilderService
{
    public function build(int $dataEndRow, int $summaryRow): array
    {
        $dataStartRow = 12;
        $criteriaCell = "E{$summaryRow}";

        return [
            'F' => sprintf(
                '=SUMIF($E$%d:$E$%d,%s,$I$%d:$I$%d)',
                $dataStartRow, $dataEndRow, $criteriaCell, $dataStartRow, $dataEndRow
            ),
            'G' => sprintf(
                '=SUMIF($E$%d:$E$%d,%s,$K$%d:$K$%d)',
                $dataStartRow, $dataEndRow, $criteriaCell, $dataStartRow, $dataEndRow
            ),
        ];
    }
}
