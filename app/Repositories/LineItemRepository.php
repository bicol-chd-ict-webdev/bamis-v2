<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\LineItemInterface;
use App\Models\LineItem;
use Illuminate\Support\Collection;

class LineItemRepository implements LineItemInterface
{
    public function create(array $attributes): LineItem
    {
        return LineItem::create($attributes);
    }

    public function update(LineItem $lineItem, array $attributes): void
    {
        $lineItem->update($attributes);
    }

    public function delete(LineItem $lineItem): void
    {
        $lineItem->delete();
    }

    public function list(): Collection
    {
        return LineItem::withoutTrashed()->latest()->get(['id', 'name', 'acronym', 'code']);
    }

    public function dropdownList(): Collection
    {
        return LineItem::withoutTrashed()->oldest('name')->get(['id', 'name']);
    }
}
