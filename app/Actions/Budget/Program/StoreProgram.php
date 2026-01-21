<?php

declare(strict_types=1);

namespace App\Actions\Budget\Program;

use App\Models\Program;
use App\Repositories\ProgramRepository;

final readonly class StoreProgram
{
    public function __construct(private ProgramRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Program
    {
        return $this->repository->create($attributes);
    }
}
