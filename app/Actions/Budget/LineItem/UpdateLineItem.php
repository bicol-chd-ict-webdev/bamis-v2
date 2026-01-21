<?php

declare(strict_types=1);

namespace App\Actions\Budget\LineItem;

use App\Models\LineItem;
use App\Repositories\LineItemRepository;

final readonly class UpdateLineItem
{
    public function __construct(private LineItemRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(LineItem $lineItem, array $attributes): bool
    {
        return $this->repository->update($lineItem, $attributes);
    }
}
