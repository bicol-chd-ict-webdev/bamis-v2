<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\LineItemInterface;
use App\Models\LineItem;
use Illuminate\Support\Collection;

final class LineItemRepository implements LineItemInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): LineItem
    {
        return LineItem::query()->create($attributes);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(LineItem $lineItem, array $attributes): bool
    {
        return $lineItem->update($attributes);
    }

    public function delete(LineItem $lineItem): ?bool
    {
        return $lineItem->delete();
    }

    /**
     * @return Collection<int, LineItem>
     */
    public function list(): Collection
    {
        return LineItem::withoutTrashed()->latest()->get(['id', 'name', 'acronym', 'code']);
    }

    /**
     * @return Collection<int, LineItem>
     */
    public function dropdownList(): Collection
    {
        return LineItem::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
