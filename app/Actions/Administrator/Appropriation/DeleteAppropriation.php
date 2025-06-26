<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Appropriation;

use App\Models\Appropriation;
use App\Repositories\AppropriationRepository;

class DeleteAppropriation
{
    public function __construct(private readonly AppropriationRepository $repository) {}

    public function handle(Appropriation $appropriation): void
    {
        $this->repository->delete($appropriation);
    }
}
