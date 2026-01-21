<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\ObjectDistribution;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

interface ObjectDistributionInterface
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes): ObjectDistribution;

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(ObjectDistribution $objectDistribution, array $attributes): bool;

    public function delete(ObjectDistribution $objectDistribution): ?bool;

    /**
     * @return Collection<int, ObjectDistribution>
     */
    public function list(): Collection;

    /**
     * @return SupportCollection<int, array{
     *     allocation_id: int|null,
     *     amount: string|null,
     *     expenditure_id: int|null,
     *     expenditure_name: string,
     *     obligations_count: mixed,
     * }>
     */
    public function listWithObligationCount(): SupportCollection;
}
