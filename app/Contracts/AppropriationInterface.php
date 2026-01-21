<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Appropriation;
use Illuminate\Database\Eloquent\Collection;

interface AppropriationInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Appropriation;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Appropriation $appropriation, array $attributes): bool;

    public function delete(Appropriation $appropriation): ?bool;

    /**
     * @return Collection<int, Appropriation>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, Appropriation>
     */
    public function dropdownList(): Collection;
}
