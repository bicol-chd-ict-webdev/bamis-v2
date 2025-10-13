<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Models\Division;
use App\Repositories\DivisionRepository;

final readonly class UpdateDivision
{
    public function __construct(private DivisionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Division $division, array $attributes): void
    {
        $this->repository->update($division, $attributes);
    }
}
