<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Allocation;
use Illuminate\Database\Eloquent\Collection;

interface AllocationInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Allocation;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Allocation $allocation, array $attributes): bool;

    public function delete(Allocation $allocation): ?bool;

    /**
     * @return Collection<int, Allocation>
     */
    public function list(): Collection;
}
