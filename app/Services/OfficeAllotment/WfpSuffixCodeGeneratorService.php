<?php

declare(strict_types=1);

namespace App\Services\OfficeAllotment;

use App\Models\Allocation;
use App\Models\AppropriationType;

class WfpSuffixCodeGeneratorService
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function generate(array $attributes): ?string
    {
        /** @var Allocation $allocation */
        $allocation = Allocation::findOrFail($attributes['allocation_id']);

        if (! $allocation->saa_number) {
            return null;
        }

        return match ($allocation->appropriation_type_id) {
            AppropriationType::CURRENT => 'CS'.mb_substr((string) $allocation->saa_number, -4),
            AppropriationType::CONAP => 'CA',
            default => null,
        };
    }
}
