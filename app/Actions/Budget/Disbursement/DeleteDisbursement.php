<?php

declare(strict_types=1);

namespace App\Actions\Budget\Disbursement;

use App\Models\Disbursement;
use App\Repositories\DisbursementRepository;

class DeleteDisbursement
{
    public function __construct(private readonly DisbursementRepository $repository) {}

    public function handle(Disbursement $disbursement): void
    {
        $this->repository->delete($disbursement);
    }
}
