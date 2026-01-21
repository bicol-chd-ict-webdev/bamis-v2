<?php

declare(strict_types=1);

namespace App\Actions\Budget\Allocation;

use App\Models\Allocation;
use App\Repositories\AllocationRepository;

final readonly class DestroyAllocation
{
    public function __construct(private AllocationRepository $repository) {}

    public function handle(Allocation $allocation): ?bool
    {
        return $this->repository->delete($allocation);
    }
}
