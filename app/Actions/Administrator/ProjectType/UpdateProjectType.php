<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProjectType;

use App\Models\ProjectType;
use App\Repositories\ProjectTypeRepository;

class UpdateProjectType
{
    public function __construct(private readonly ProjectTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(ProjectType $projectType, array $attributes): void
    {
        $this->repository->update($projectType, $attributes);
    }
}
