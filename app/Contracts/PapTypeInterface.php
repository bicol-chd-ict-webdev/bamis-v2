<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\PapType;
use Illuminate\Database\Eloquent\Collection;

interface PapTypeInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): PapType;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(PapType $papType, array $attributes): void;

    public function delete(PapType $papType): void;

    /**
     * @return Collection<int, PapType>
     */
    public function list(): Collection;
}
