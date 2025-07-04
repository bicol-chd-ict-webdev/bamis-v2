<?php

declare(strict_types=1);

namespace App\Actions\Budget\OfficeAllotment;

use App\Repositories\OfficeAllotmentRepository;

class CreateOfficeAllotment
{
    public function __construct(private readonly OfficeAllotmentRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
