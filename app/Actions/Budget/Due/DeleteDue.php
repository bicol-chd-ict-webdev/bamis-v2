<?php

declare(strict_types=1);

namespace App\Actions\Budget\Due;

use App\Models\Due;
use App\Repositories\DueRepository;

final readonly class DeleteDue
{
    public function __construct(private DueRepository $repository) {}

    public function handle(Due $due): void
    {
        $this->repository->delete($due);
    }
}
