<?php

declare(strict_types=1);

namespace App\Actions\Administrator\AllotmentClass;

use App\Models\AllotmentClass;
use App\Repositories\AllotmentClassRepository;

final readonly class StoreAllotmentClass
{
    public function __construct(private AllotmentClassRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): AllotmentClass
    {
        return $this->repository->create($attributes);
    }
}
