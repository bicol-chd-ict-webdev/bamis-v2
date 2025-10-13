<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProgramClassification;

use App\Models\ProgramClassification;
use App\Repositories\ProgramClassificationRepository;

final readonly class DeleteProgramClassification
{
    public function __construct(private ProgramClassificationRepository $repository) {}

    public function handle(ProgramClassification $programClassification): void
    {
        $this->repository->delete($programClassification);
    }
}
