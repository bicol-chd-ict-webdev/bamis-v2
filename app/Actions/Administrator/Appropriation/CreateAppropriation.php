<?php

declare(strict_types=1);

namespace App\Actions\Administrator\Appropriation;

use App\Repositories\AppropriationRepository;

class CreateAppropriation
{
    public function __construct(private readonly AppropriationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
