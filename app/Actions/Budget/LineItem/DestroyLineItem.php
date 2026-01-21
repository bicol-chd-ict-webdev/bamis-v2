<?php

declare(strict_types=1);

namespace App\Actions\Budget\LineItem;

use App\Models\LineItem;
use App\Repositories\LineItemRepository;

final readonly class DestroyLineItem
{
    public function __construct(private LineItemRepository $repository) {}

    public function handle(LineItem $lineItem): ?bool
    {
        return $this->repository->delete($lineItem);
    }
}
