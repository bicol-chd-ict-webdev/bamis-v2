<?php

declare(strict_types=1);

namespace App\Actions\Budget\Disbursement;

use App\Models\Disbursement;
use App\Repositories\DisbursementRepository;

final readonly class UpdateDisbursement
{
    public function __construct(private DisbursementRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(Disbursement $disbursement, array $attributes): void
    {
        $this->repository->update($disbursement, $attributes);
    }
}
