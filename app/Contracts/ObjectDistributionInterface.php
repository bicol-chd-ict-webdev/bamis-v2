<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\ObjectDistribution;
use Illuminate\Database\Eloquent\Collection;

interface ObjectDistributionInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): ObjectDistribution;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(ObjectDistribution $objectDistribution, array $attributes): void;

    public function delete(ObjectDistribution $objectDistribution): void;

    /**
     * @return Collection<int, ObjectDistribution>
     */
    public function list(): Collection;
}
