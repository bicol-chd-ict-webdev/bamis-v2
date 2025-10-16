<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProjectType;

use App\Repositories\ProjectTypeRepository;

final readonly class CreateProjectType
{
    public function __construct(private ProjectTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
