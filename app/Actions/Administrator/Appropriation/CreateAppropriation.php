<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Appropriation;

use App\Repositories\AppropriationRepository;

final readonly class CreateAppropriation
{
    public function __construct(private AppropriationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
