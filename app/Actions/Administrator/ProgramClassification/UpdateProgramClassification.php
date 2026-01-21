<?php

declare(strict_types=1);

namespace App\Actions\Administrator\ProgramClassification;

use App\Models\ProgramClassification;
use App\Repositories\ProgramClassificationRepository;

final readonly class UpdateProgramClassification
{
    public function __construct(private ProgramClassificationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(ProgramClassification $programClassification, array $attributes): bool
    {
        return $this->repository->update($programClassification, $attributes);
    }
}
