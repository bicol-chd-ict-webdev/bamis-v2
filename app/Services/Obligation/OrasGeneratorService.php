<?php

declare(strict_types=1);

namespace App\Services\Obligation;

use App\Models\Allocation;
use Carbon\CarbonImmutable;

class OrasGeneratorService
{
    public function __construct(private readonly OrasNumberBuilderService $orasNumberBuilderService) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function generate(array $attributes): string
    {
        /** @var Allocation $allocation */
        $allocation = Allocation::findOrFail($attributes['allocation_id']);

        assert(is_string($attributes['date']));
        $date = CarbonImmutable::parse($attributes['date']);

        return $this->orasNumberBuilderService->buildWithMonth($allocation, $date);
    }
}
