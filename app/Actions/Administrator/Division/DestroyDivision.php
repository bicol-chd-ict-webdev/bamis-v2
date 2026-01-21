<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Models\Division;
use App\Repositories\DivisionRepository;

final readonly class DestroyDivision
{
    public function __construct(private DivisionRepository $repository) {}

    public function handle(Division $division): ?bool
    {
        return $this->repository->delete($division);
    }
}
