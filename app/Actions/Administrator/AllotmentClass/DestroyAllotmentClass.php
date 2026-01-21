<?php

declare(strict_types=1);

namespace App\Actions\Administrator\AllotmentClass;

use App\Models\AllotmentClass;
use App\Repositories\AllotmentClassRepository;

final readonly class DestroyAllotmentClass
{
    public function __construct(private AllotmentClassRepository $repository) {}

    public function handle(AllotmentClass $allotmentClass): ?bool
    {
        return $this->repository->delete($allotmentClass);
    }
}
