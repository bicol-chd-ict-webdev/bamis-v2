<?php

declare(strict_types=1);

namespace App\Actions\Budget\Subprogram;

use App\Models\Subprogram;
use App\Repositories\SubprogramRepository;

final readonly class UpdateSubprogram
{
    public function __construct(private SubprogramRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Subprogram $subprogram, array $attributes): bool
    {
        return $this->repository->update($subprogram, $attributes);
    }
}
