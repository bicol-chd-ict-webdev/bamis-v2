<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Appropriation;

use App\Models\Appropriation;
use App\Repositories\AppropriationRepository;

final readonly class DeleteAppropriation
{
    public function __construct(private AppropriationRepository $repository) {}

    public function handle(Appropriation $appropriation): void
    {
        $this->repository->delete($appropriation);
    }
}
