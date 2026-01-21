<?php

declare(strict_types=1);

namespace App\Actions\Budget\ObjectDistribution;

use App\Models\ObjectDistribution;
use App\Repositories\ObjectDistributionRepository;

final readonly class DestroyObjectDistribution
{
    public function __construct(private ObjectDistributionRepository $repository) {}

    public function handle(ObjectDistribution $objectDistribution): ?bool
    {
        return $this->repository->delete($objectDistribution);
    }
}
