<?php

declare(strict_types=1);

namespace App\Actions\Budget\Program;

use App\Models\Program;
use App\Repositories\ProgramRepository;

final readonly class DeleteProgram
{
    public function __construct(private ProgramRepository $repository) {}

    public function handle(Program $program): void
    {
        $this->repository->delete($program);
    }
}
