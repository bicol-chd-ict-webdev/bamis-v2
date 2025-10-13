<?php

declare(strict_types=1);

namespace App\Actions\Administrator\AppropriationType;

use App\Repositories\AppropriationTypeRepository;

final readonly class CreateAppropriationType
{
    public function __construct(private AppropriationTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
