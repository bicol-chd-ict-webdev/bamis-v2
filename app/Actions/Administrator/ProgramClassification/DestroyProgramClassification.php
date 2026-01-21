<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProgramClassification;

use App\Models\ProgramClassification;
use App\Repositories\ProgramClassificationRepository;

final readonly class DestroyProgramClassification
{
    public function __construct(private ProgramClassificationRepository $repository) {}

    public function handle(ProgramClassification $programClassification): ?bool
    {
        return $this->repository->delete($programClassification);
    }
}
