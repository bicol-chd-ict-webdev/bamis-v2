<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use App\Models\AllotmentClass;
use App\Models\Appropriation;
use App\Models\AppropriationType;
use Brick\Math\BigDecimal;

final class BurResultTransformerService
{
    public function transform(array $rows): array
    {
        $appropriations = Appropriation::query()->pluck('acronym', 'id');
        $appropriationTypes = AppropriationType::query()->pluck('acronym', 'id');
        $allotmentClasses = AllotmentClass::query()->pluck('acronym', 'id');

        $result = [];

        foreach ($rows as $row) {
            $division = $row->division_acronym;
            $section = $row->section_name;
            $sectionCode = $row->section_code;
            $allotmentClass = $allotmentClasses[$row->allotment_class_id];
            $key = $appropriations[$row->appropriation_id].' '.$appropriationTypes[$row->appropriation_type_id];

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
                        foreach ($appropriationTypes as $typeAcronym) {
                            $result[$division]['sections'][$section]['allotmentClasses'][$classAcronym]["$appropriationAcronym $typeAcronym"] = [
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
