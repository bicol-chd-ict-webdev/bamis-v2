<?php

declare(strict_types=1);

namespace App\Actions\Budget\ObjectDistribution;

use App\Models\ObjectDistribution;
use App\Repositories\ObjectDistributionRepository;

class DeleteObjectDistribution
{
    public function __construct(private readonly ObjectDistributionRepository $repository) {}

    public function handle(ObjectDistribution $objectDistribution): void
    {
        $this->repository->delete($objectDistribution);
    }
}
