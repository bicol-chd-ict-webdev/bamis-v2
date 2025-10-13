<?php

declare(strict_types=1);

namespace App\Actions\Budget\Due;

use App\Repositories\DueRepository;

final readonly class CreateDue
{
    public function __construct(private DueRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
