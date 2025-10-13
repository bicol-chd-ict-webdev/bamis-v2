<?php

declare(strict_types=1);

namespace App\Actions\Budget\LineItem;

use App\Models\LineItem;
use App\Repositories\LineItemRepository;

final readonly class DeleteLineItem
{
    public function __construct(private LineItemRepository $repository) {}

    public function handle(LineItem $lineItem): void
    {
        $this->repository->delete($lineItem);
    }
}
