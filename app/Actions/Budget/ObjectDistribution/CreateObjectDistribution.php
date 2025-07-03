<?php

declare(strict_types=1);

namespace App\Actions\Budget\ObjectDistribution;

use App\Repositories\ObjectDistributionRepository;

class CreateObjectDistribution
{
    public function __construct(private readonly ObjectDistributionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
