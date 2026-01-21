<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProjectType;

use App\Models\ProjectType;
use App\Repositories\ProjectTypeRepository;

final readonly class StoreProjectType
{
    public function __construct(private ProjectTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): ProjectType
    {
        return $this->repository->create($attributes);
    }
}
