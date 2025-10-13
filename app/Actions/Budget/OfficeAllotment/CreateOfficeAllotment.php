<?php

declare(strict_types=1);

namespace App\Actions\Budget\OfficeAllotment;

use App\Repositories\OfficeAllotmentRepository;

final readonly class CreateOfficeAllotment
{
    public function __construct(private OfficeAllotmentRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
