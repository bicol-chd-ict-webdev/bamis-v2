<?php

declare(strict_types=1);

namespace App\Actions\Budget\ObjectDistribution;

use App\Models\ObjectDistribution;
use App\Repositories\ObjectDistributionRepository;

final readonly class StoreObjectDistribution
{
    public function __construct(private ObjectDistributionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): ObjectDistribution
    {
        return $this->repository->create($attributes);
    }
}
