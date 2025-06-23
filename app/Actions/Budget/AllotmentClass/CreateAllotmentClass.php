<?php

declare(strict_types=1);

namespace App\Actions\Budget\AllotmentClass;

use App\Repositories\AllotmentClassRepository;

class CreateAllotmentClass
{
    public function __construct(private readonly AllotmentClassRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
