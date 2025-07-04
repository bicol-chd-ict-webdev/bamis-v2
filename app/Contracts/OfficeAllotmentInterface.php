<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\OfficeAllotment;
use Illuminate\Database\Eloquent\Collection;

interface OfficeAllotmentInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): OfficeAllotment;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(OfficeAllotment $officeAllotment, array $attributes): void;

    public function delete(OfficeAllotment $officeAllotment): void;

    /**
     * @return Collection<int, OfficeAllotment>
     */
    public function list(): Collection;
}
