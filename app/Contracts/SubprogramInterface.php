<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Subprogram;
use Illuminate\Database\Eloquent\Collection;

interface SubprogramInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Subprogram;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Subprogram $subprogram, array $attributes): void;

    public function delete(Subprogram $subprogram): void;

    /**
     * @return Collection<int, Subprogram>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, Subprogram>
     */
    public function dropdownList(): Collection;
}
