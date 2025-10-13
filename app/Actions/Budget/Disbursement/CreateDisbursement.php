<?php

declare(strict_types=1);

namespace App\Actions\Budget\Disbursement;

use App\Repositories\DisbursementRepository;

final readonly class CreateDisbursement
{
    public function __construct(private DisbursementRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
