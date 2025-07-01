<?php

declare(strict_types=1);

namespace App\Actions\Budget\Allocation;

use App\Repositories\AllocationRepository;

class CreateAllocation
{
    public function __construct(private readonly AllocationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
