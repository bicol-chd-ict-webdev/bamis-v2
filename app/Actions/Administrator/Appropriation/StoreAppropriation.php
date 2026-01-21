<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Appropriation;

use App\Models\Appropriation;
use App\Repositories\AppropriationRepository;

final readonly class StoreAppropriation
{
    public function __construct(private AppropriationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Appropriation
    {
        return $this->repository->create($attributes);
    }
}
