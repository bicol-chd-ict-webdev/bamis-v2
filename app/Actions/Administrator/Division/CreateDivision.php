<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Division;

use App\Repositories\DivisionRepository;

class CreateDivision
{
    public function __construct(private readonly DivisionRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
