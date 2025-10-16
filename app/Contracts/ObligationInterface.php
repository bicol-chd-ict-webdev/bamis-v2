<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Obligation;
use Illuminate\Database\Eloquent\Collection;

interface ObligationInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     * @return array<int, Obligation>
     */
    public function create(array $attributes): array;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Obligation $obligation, array $attributes): void;

    public function delete(Obligation $obligation): void;

    /**
     * @return Collection<int, Obligation>
     */
    public function list(): Collection;

    public function cancel(Obligation $obligation): void;
}
