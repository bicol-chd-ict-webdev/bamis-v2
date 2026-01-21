<?php

declare(strict_types=1);

namespace App\Actions\Budget\OfficeAllotment;

use App\Models\OfficeAllotment;
use App\Repositories\OfficeAllotmentRepository;

final readonly class DestroyOfficeAllotment
{
    public function __construct(private OfficeAllotmentRepository $repository) {}

    public function handle(OfficeAllotment $officeAllotment): ?bool
    {
        return $this->repository->delete($officeAllotment);
    }
}
