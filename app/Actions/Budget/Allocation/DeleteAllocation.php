<?php

declare(strict_types=1);

namespace App\Actions\Budget\Allocation;

use App\Models\Allocation;
use App\Repositories\AllocationRepository;

class DeleteAllocation
{
    public function __construct(private readonly AllocationRepository $repository) {}

    public function handle(Allocation $allocation): void
    {
        $this->repository->delete($allocation);
    }
}
