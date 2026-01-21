<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use App\Models\AllotmentClass;
use App\Models\Appropriation;
use App\Models\AppropriationType;
use Brick\Math\BigDecimal;

/**
 * @phpstan-type BurRow object{
 *     division_acronym: string,
 *     section_name: string,
 *     section_code: string,
 *     appropriation_id: int|string,
 *     appropriation_type_id: int|string,
 *     allotment_class_id: int|string,
 *     allotment: float|int|string,
 *     obligation: float|int|string,
 *     disbursement: float|int|string
 * }
 * @phpstan-type BurResult array<string, array{
 *     sections: array<string, array{
 *         code: string,
 *         allotmentClasses: array<string, array<string, array{
 *             allotment: BigDecimal,
 *             obligation: BigDecimal,
 *             disbursement: BigDecimal
 *         }>>
 *     }>
 * }>
 */
final class BurResultTransformerService
{
    /**
     * @param  array<int, BurRow>  $rows
     * @return BurResult
     */
    public function transform(array $rows): array
    {
        /** @var \Illuminate\Support\Collection<int, string> $appropriations */
        $appropriations = Appropriation::query()->pluck('acronym', 'id');
        /** @var \Illuminate\Support\Collection<int, string> $appropriationTypes */
        $appropriationTypes = AppropriationType::query()->pluck('acronym', 'id');
        /** @var \Illuminate\Support\Collection<int, string> $allotmentClasses */
        $allotmentClasses = AllotmentClass::query()->pluck('acronym', 'id');

        /** @var BurResult $result */
        $result = [];

        foreach ($rows as $row) {
            $division = (string) $row->division_acronym;
            $section = (string) $row->section_name;
            $sectionCode = (string) $row->section_code;
            $allotmentClass = $allotmentClasses[(int) $row->allotment_class_id];

            $appAcronym = $appropriations[(int) $row->appropriation_id] ?? '';
            $typeAcronym = $appropriationTypes[(int) $row->appropriation_type_id] ?? '';
            $key = $appAcronym.' '.$typeAcronym;

            if (! isset($result[$division])) {
                $result[$division] = ['sections' => []];
            }

            if (! isset($result[$division]['sections'][$section])) {
                $result[$division]['sections'][$section] = [
                    'code' => $sectionCode,
                    'allotmentClasses' => [],
                ];

                // Initialize allotment classes
                foreach ($allotmentClasses as $classAcronym) {
                    // Hide PS unless the division is OTHERS
                    if ($classAcronym === 'PS' && ! ($division === 'OTHERS' && $section === 'Personnel Services')) {
                        continue;
                    }

                    $result[$division]['sections'][$section]['allotmentClasses'][$classAcronym] = [];

                    // Set default keys for each appropriation + type
                    foreach ($appropriations as $appropriationAcronym) {
                        foreach ($appropriationTypes as $typeAcronymInner) {
                            $result[$division]['sections'][$section]['allotmentClasses'][$classAcronym][sprintf('%s %s', $appropriationAcronym, $typeAcronymInner)] = [
                                'allotment' => BigDecimal::of(0),
                                'obligation' => BigDecimal::of(0),
                                'disbursement' => BigDecimal::of(0),
                            ];
                        }
                    }
                }
            }

            // Fill data only if the class is initialized (PS will be skipped in non-OTHERS divisions)
            if (isset($result[$division]['sections'][$section]['allotmentClasses'][$allotmentClass])) {
                $result[$division]['sections'][$section]['allotmentClasses'][$allotmentClass][$key] = [
                    'allotment' => BigDecimal::of((string) $row->allotment),
                    'obligation' => BigDecimal::of((string) $row->obligation),
                    'disbursement' => BigDecimal::of((string) $row->disbursement),
                ];
            }
        }

        return $result;
    }
}
