<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use App\Enums\BURGroup;

class ValueBuilderService
{
    public function __construct(private readonly FormulaBuilder $formulas) {}

    public function build(string $groupType, int $row, callable $defaultHandler): array
    {
        $currentColumns = ColumnMap::MAP[BURGroup::CURRENT_TOTAL->value];
        $conapColumns = ColumnMap::MAP[BURGroup::CONAP_TOTAL->value];
        $saaCurrentColumns = ColumnMap::MAP[BURGroup::SAA_CURRENT->value];
        $gaaCurrentColumns = ColumnMap::MAP[BURGroup::GAA_CURRENT->value];
        $saaConapColumns = ColumnMap::MAP[BURGroup::SAA_CONAP->value];
        $gaaConapColumns = ColumnMap::MAP[BURGroup::GAA_CONAP->value];
        $saroCurrentColumns = ColumnMap::MAP[BURGroup::SARO_CURRENT->value];

        return match ($groupType) {
            BURGroup::GRAND_TOTAL->value => $this->buildFormula([$currentColumns, $conapColumns], $row),
            BURGroup::CURRENT_TOTAL->value => $this->buildFormula([$saaCurrentColumns, $gaaCurrentColumns, $saroCurrentColumns], $row),
            BURGroup::CONAP_TOTAL->value => $this->buildFormula([$saaConapColumns, $gaaConapColumns], $row),
            default => $defaultHandler($groupType),
        };
    }

    private function buildFormula(array $columnSets, int $row): array
    {
        return array_map(
            fn (int $i): string => $this->formulas->add(
                ...array_map(fn (array $columns): string => "{$columns[$i]}{$row}", $columnSets)
            ),
            range(0, 2)
        );
    }
}
