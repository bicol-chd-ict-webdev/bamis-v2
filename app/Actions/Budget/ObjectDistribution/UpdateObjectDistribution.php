<?php

declare(strict_types=1);

namespace App\Actions\Budget\ObjectDistribution;

use App\Models\ObjectDistribution;
use App\Repositories\ObjectDistributionRepository;

final readonly class UpdateObjectDistribution
{
    public function __construct(private ObjectDistributionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(ObjectDistribution $objectDistribution, array $attributes): void
    {
        $this->repository->update($objectDistribution, $attributes);
    }
}
