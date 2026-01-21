<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\LineItem;
use Illuminate\Support\Collection;

interface LineItemInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): LineItem;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(LineItem $lineItem, array $attributes): bool;

    public function delete(LineItem $lineItem): ?bool;

    /**
     * @return Collection<int, LineItem>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, LineItem>
     */
    public function dropdownList(): Collection;
}
