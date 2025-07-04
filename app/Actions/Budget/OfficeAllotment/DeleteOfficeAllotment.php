<?php

declare(strict_types=1);

namespace App\Actions\Budget\OfficeAllotment;

use App\Models\OfficeAllotment;
use App\Repositories\OfficeAllotmentRepository;

class DeleteOfficeAllotment
{
    public function __construct(private readonly OfficeAllotmentRepository $repository) {}

    public function handle(OfficeAllotment $officeAllotment): void
    {
        $this->repository->delete($officeAllotment);
    }
}
