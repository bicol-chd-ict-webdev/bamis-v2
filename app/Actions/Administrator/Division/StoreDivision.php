<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Models\Division;
use App\Repositories\DivisionRepository;

final readonly class StoreDivision
{
    public function __construct(private DivisionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Division
    {
        return $this->repository->create($attributes);
    }
}
