<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProgramClassification;

use App\Repositories\ProgramClassificationRepository;

class CreateProgramClassification
{
    public function __construct(private readonly ProgramClassificationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
