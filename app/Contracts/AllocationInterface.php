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
    public function update(Allocation $allocation, array $attributes): void;

    public function delete(Allocation $allocation): void;

    /**
     * @return Collection<int, Allocation>
     */
    public function list(): Collection;
}
