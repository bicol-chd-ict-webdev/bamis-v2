<?php

declare(strict_types=1);

namespace App\Actions\Budget\AllotmentClass;

use App\Models\AllotmentClass;
use App\Repositories\AllotmentClassRepository;

class DeleteAllotmentClass
{
    public function __construct(private readonly AllotmentClassRepository $repository) {}

    public function handle(AllotmentClass $allotmentClass): void
    {
        $this->repository->delete($allotmentClass);
    }
}
