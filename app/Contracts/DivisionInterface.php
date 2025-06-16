<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Division;
use Illuminate\Support\Collection;

interface DivisionInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Division;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Division $division, array $attributes): void;

    public function delete(Division $division): void;

    /**
     * @return Collection<int, Division>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, Division>
     */
    public function listWithSectionCount(): Collection;
}
