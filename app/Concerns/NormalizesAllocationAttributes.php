<?php

declare(strict_types=1);

namespace App\Concerns;

trait NormalizesAllocationAttributes
{
    /**
     * @param  array<string, mixed>  $attributes
     * @return array<string, mixed>
     */
    private function normalizeAttributes(array $attributes): array
    {
        $attributes['program_classification_id'] = $attributes['program_classification_id'] ?: null;
        $attributes['program_id'] = $attributes['program_id'] ?: null;
        $attributes['subprogram_id'] = $attributes['subprogram_id'] ?: null;
        $attributes['project_type_id'] = $attributes['project_type_id'] ?: null;

        return $attributes;
    }
}
