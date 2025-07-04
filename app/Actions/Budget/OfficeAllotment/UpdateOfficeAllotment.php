<?php

declare(strict_types=1);

namespace App\Actions\Budget\OfficeAllotment;

use App\Models\OfficeAllotment;
use App\Repositories\OfficeAllotmentRepository;

class UpdateOfficeAllotment
{
    public function __construct(private readonly OfficeAllotmentRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(OfficeAllotment $officeAllotment, array $attributes): void
    {
        $this->repository->update($officeAllotment, $attributes);
    }
}
