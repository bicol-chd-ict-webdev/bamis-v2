<?php

declare(strict_types=1);

namespace App\Actions\Budget\Subprogram;

use App\Models\Subprogram;
use App\Repositories\SubprogramRepository;

final readonly class DeleteSubprogram
{
    public function __construct(private SubprogramRepository $repository) {}

    public function handle(Subprogram $subprogram): void
    {
        $this->repository->delete($subprogram);
    }
}
