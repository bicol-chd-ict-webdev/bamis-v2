<?php

declare(strict_types=1);

namespace App\Actions\Budget\LineItem;

use App\Models\LineItem;
use App\Repositories\LineItemRepository;

class UpdateLineItem
{
    public function __construct(private readonly LineItemRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(LineItem $lineItem, array $attributes): void
    {
        $this->repository->update($lineItem, $attributes);
    }
}
