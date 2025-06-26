<?php

declare(strict_types=1);

namespace App\Actions\Administrator\PapType;

use App\Repositories\PapTypeRepository;

class CreatePapType
{
    public function __construct(private readonly PapTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
