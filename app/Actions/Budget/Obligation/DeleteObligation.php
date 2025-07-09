<?php

declare(strict_types=1);

namespace App\Actions\Budget\Obligation;

use App\Models\Obligation;
use App\Repositories\ObligationRepository;

class DeleteObligation
{
    public function __construct(private readonly ObligationRepository $repository) {}

    public function handle(Obligation $obligation): void
    {
        $this->repository->delete($obligation);
    }
}
