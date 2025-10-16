<?php

declare(strict_types=1);

namespace App\Services\Obligation;

use App\Models\Allocation;
use Carbon\CarbonImmutable;

final readonly class OrasGeneratorService
{
    public function __construct(private OrasNumberBuilderService $orasNumberBuilderService) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function generate(array $attributes): string
    {
        /** @var Allocation $allocation */
        $allocation = Allocation::query()->findOrFail($attributes['allocation_id']);

        assert(is_string($attributes['date']));
        $date = CarbonImmutable::parse($attributes['date']);

        return $this->orasNumberBuilderService->buildWithMonth($allocation, $date);
    }
}
