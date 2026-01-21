<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProgramClassification;

use App\Models\ProgramClassification;
use App\Repositories\ProgramClassificationRepository;

final readonly class StoreProgramClassification
{
    public function __construct(private ProgramClassificationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): ProgramClassification
    {
        return $this->repository->create($attributes);
    }
}
