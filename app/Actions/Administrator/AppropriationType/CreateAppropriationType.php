<?php

declare(strict_types=1);

namespace App\Actions\Administrator\AppropriationType;

use App\Repositories\AppropriationTypeRepository;

class CreateAppropriationType
{
    public function __construct(private readonly AppropriationTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
