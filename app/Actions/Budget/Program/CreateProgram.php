<?php

declare(strict_types=1);

namespace App\Actions\Budget\Program;

use App\Repositories\ProgramRepository;

final readonly class CreateProgram
{
    public function __construct(private ProgramRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
