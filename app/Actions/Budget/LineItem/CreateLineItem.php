<?php

declare(strict_types=1);

namespace App\Actions\Budget\LineItem;

use App\Repositories\LineItemRepository;

class CreateLineItem
{
    public function __construct(private readonly LineItemRepository $repository) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): void
    {
        $this->repository->create($attributes);
    }
}
