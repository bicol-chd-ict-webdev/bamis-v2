<?php

declare(strict_types=1);

namespace App\Actions\Budget\Subprogram;

use App\Models\Subprogram;
use App\Repositories\SubprogramRepository;

final readonly class StoreSubprogram
{
    public function __construct(private SubprogramRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Subprogram
    {
        return $this->repository->create($attributes);
    }
}
