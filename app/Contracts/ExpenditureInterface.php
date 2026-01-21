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
    public function update(Expenditure $expenditure, array $attributes): bool;

    public function delete(Expenditure $expenditure): ?bool;

    /**
     * @return Collection<int, Expenditure>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, Expenditure>
     */
    public function comboboxList(): Collection;

    /**
     * @return Collection<int, Expenditure>
     */
    public function listWithObjectDistributionObligationCount(): Collection;
}
