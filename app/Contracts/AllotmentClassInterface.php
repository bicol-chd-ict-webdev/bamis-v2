<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\AllotmentClass;
use Illuminate\Database\Eloquent\Collection;

interface AllotmentClassInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): AllotmentClass;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(AllotmentClass $allotmentClass, array $attributes): void;

    public function delete(AllotmentClass $allotmentClass): void;

    /**
     * @return Collection<int, AllotmentClass>
     */
    public function list(): Collection;

    /**
     * @return Collection<int, AllotmentClass>
     */
    public function listWithExpenditureCount(): Collection;

    /**
     * @return Collection<int, AllotmentClass>
     */
    public function dropdownList(): Collection;
}
