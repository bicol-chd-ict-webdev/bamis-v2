<?php

declare(strict_types=1);

namespace App\Actions\Administrator\AppropriationType;

use App\Models\AppropriationType;
use App\Repositories\AppropriationTypeRepository;

final readonly class DeleteAppropriationType
{
    public function __construct(private AppropriationTypeRepository $repository) {}

    public function handle(AppropriationType $appropriationType): void
    {
        $this->repository->delete($appropriationType);
    }
}
