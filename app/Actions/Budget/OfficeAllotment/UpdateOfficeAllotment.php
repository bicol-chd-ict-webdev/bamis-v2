<?php

declare(strict_types=1);

namespace App\Actions\Budget\OfficeAllotment;

use App\Models\OfficeAllotment;
use App\Repositories\OfficeAllotmentRepository;

final readonly class UpdateOfficeAllotment
{
    public function __construct(private OfficeAllotmentRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(OfficeAllotment $officeAllotment, array $attributes): bool
    {
        return $this->repository->update($officeAllotment, $attributes);
    }
}
