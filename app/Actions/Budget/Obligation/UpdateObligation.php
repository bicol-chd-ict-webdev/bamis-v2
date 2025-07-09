<?php

declare(strict_types=1);

namespace App\Actions\Budget\Obligation;

use App\Models\Obligation;
use App\Repositories\ObligationRepository;

class UpdateObligation
{
    public function __construct(private readonly ObligationRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Obligation $obligation, array $attributes): void
    {
        $this->repository->update($obligation, $attributes);
    }
}
