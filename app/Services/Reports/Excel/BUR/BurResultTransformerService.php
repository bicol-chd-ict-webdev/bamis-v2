<?php

declare(strict_types=1);

namespace App\Services\Reports\Excel\BUR;

use App\Models\AllotmentClass;
use App\Models\Appropriation;
use App\Models\AppropriationType;
use Brick\Math\BigDecimal;

class BurResultTransformerService
{
    public function transform(array $rows): array
    {
        $appropriations = Appropriation::pluck('acronym', 'id');
        $appropriationTypes = AppropriationType::pluck('acronym', 'id');
        $allotmentClasses = AllotmentClass::pluck('acronym', 'id');

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

                foreach ($allotmentClasses as $classAcronym) {
                    $result[$division]['sections'][$section]['allotmentClasses'][$classAcronym] = [];

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

            $result[$division]['sections'][$section]['allotmentClasses'][$allotmentClass][$key] = [
                'allotment' => BigDecimal::of((string) $row->allotment),
                'obligation' => BigDecimal::of((string) $row->obligation),
                'disbursement' => BigDecimal::of((string) $row->disbursement),
            ];
        }

        return $result;
    }
}
