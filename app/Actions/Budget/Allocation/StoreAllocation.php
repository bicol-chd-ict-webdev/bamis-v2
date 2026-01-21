<?php

declare(strict_types=1);

namespace App\Actions\Budget\Allocation;

use App\Concerns\NormalizesAllocationAttributes;
use App\Models\Allocation;
use App\Repositories\AllocationRepository;

final readonly class StoreAllocation
{
    use NormalizesAllocationAttributes;

    public function __construct(private AllocationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Allocation
    {
        return $this->repository->create($this->normalizeAttributes($attributes));
    }
}
