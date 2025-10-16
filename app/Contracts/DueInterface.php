<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Due;
use Illuminate\Support\Collection;

interface DueInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Due;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Due $due, array $attributes): void;

    public function delete(Due $due): void;

    /**
     * @return Collection<int, Due>
     */
    public function list(): Collection;
}
