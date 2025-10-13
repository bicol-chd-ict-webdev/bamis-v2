<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProjectType;

use App\Models\ProjectType;
use App\Repositories\ProjectTypeRepository;

final readonly class DeleteProjectType
{
    public function __construct(private ProjectTypeRepository $repository) {}

    public function handle(ProjectType $projectType): void
    {
        $this->repository->delete($projectType);
    }
}
