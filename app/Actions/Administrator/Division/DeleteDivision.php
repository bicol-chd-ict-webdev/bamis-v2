<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Models\Division;
use App\Repositories\DivisionRepository;

class DeleteDivision
{
    public function __construct(private readonly DivisionRepository $repository) {}

    public function handle(Division $division): void
    {
        $this->repository->delete($division);
    }
}
