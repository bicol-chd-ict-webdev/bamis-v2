<?php

declare(strict_types=1);

namespace App\Actions\Administrator\AppropriationType;

use App\Models\AppropriationType;
use App\Repositories\AppropriationTypeRepository;

final readonly class StoreAppropriationType
{
    public function __construct(private AppropriationTypeRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): AppropriationType
    {
        return $this->repository->create($attributes);
    }
}
