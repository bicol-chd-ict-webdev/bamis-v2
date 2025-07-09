<?php

declare(strict_types=1);

namespace App\Actions\Budget\Obligation;

use App\Repositories\ObligationRepository;

class CreateObligation
{
    public function __construct(private readonly ObligationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
