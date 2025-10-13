<?php

declare(strict_types=1);

namespace App\Actions\Budget\Allocation;

use App\Models\Allocation;
use App\Repositories\AllocationRepository;

final readonly class UpdateAllocation
{
    public function __construct(private AllocationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Allocation $allocation, array $attributes): void
    {
        $this->repository->update($allocation, $attributes);
    }
}
