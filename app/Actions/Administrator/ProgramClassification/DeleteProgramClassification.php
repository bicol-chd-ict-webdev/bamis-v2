<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProgramClassification;

use App\Models\ProgramClassification;
use App\Repositories\ProgramClassificationRepository;

class DeleteProgramClassification
{
    public function __construct(private readonly ProgramClassificationRepository $repository) {}

    public function handle(ProgramClassification $programClassification): void
    {
        $this->repository->delete($programClassification);
    }
}
