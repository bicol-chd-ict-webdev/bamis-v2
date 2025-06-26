<?php

declare(strict_types=1);

namespace App\Actions\Budget\Subprogram;

use App\Repositories\SubprogramRepository;

class CreateSubprogram
{
    public function __construct(private readonly SubprogramRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
