<?php

declare(strict_types=1);

namespace App\Actions\Budget\AllotmentClass;

use App\Models\AllotmentClass;
use App\Repositories\AllotmentClassRepository;

class UpdateAllotmentClass
{
    public function __construct(private readonly AllotmentClassRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(AllotmentClass $allotmentClass, array $attributes): void
    {
        $this->repository->update($allotmentClass, $attributes);
    }
}
