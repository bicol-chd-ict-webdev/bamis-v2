<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProjectType;

use App\Models\ProjectType;
use App\Repositories\ProjectTypeRepository;

final readonly class DestroyProjectType
{
    public function __construct(private ProjectTypeRepository $repository) {}

    public function handle(ProjectType $projectType): ?bool
    {
        return $this->repository->delete($projectType);
    }
}
