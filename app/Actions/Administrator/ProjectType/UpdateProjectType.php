<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProjectType;

use App\Models\ProjectType;
use App\Repositories\ProjectTypeRepository;

final readonly class UpdateProjectType
{
    public function __construct(private ProjectTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(ProjectType $projectType, array $attributes): bool
    {
        return $this->repository->update($projectType, $attributes);
    }
}
