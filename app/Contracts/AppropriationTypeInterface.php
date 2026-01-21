<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\AppropriationType;
use Illuminate\Database\Eloquent\Collection;

interface AppropriationTypeInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): AppropriationType;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(AppropriationType $appropriationType, array $attributes): bool;

    public function delete(AppropriationType $appropriationType): ?bool;

    /**
     * @return Collection<int, AppropriationType>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, AppropriationType>
     */
    public function listWithAllocationCount(): Collection;

    /**
     * @return Collection<int, AppropriationType>
     */
    public function dropdownList(): Collection;
}
