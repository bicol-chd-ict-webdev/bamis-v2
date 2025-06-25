<?php

declare(strict_types=1);

namespace App\Actions\Budget\PapType;

use App\Models\PapType;
use App\Repositories\PapTypeRepository;

class DeletePapType
{
    public function __construct(private readonly PapTypeRepository $repository) {}

    public function handle(PapType $papType): void
    {
        $this->repository->delete($papType);
    }
}
