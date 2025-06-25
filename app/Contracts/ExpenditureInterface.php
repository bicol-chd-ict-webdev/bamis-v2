<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Expenditure;
use Illuminate\Database\Eloquent\Collection;

interface ExpenditureInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): Expenditure;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Expenditure $expenditure, array $attributes): void;

    public function delete(Expenditure $expenditure): void;

    /**
     * @return Collection<int, Expenditure>
     */
    public function list(): Collection;
}
