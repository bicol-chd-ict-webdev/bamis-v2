<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Allocation;
use App\Models\Expenditure;
use App\Models\ObjectDistribution;
use Illuminate\Database\Eloquent\Factories\Factory;
use RuntimeException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ObjectDistribution>
 */
final class ObjectDistributionFactory extends Factory
{
    /**
     * Track allocated totals during seeding (in-memory, not DB).
     *
     * @var array<int, float>
     */
    private static array $allocationUsage = [];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $allocation = $this->getAvailableAllocation();

        throw_unless($allocation, RuntimeException::class, 'All allocations are fully distributed. Stopping factory generation.');

        $allocationId = $allocation->id;
        $allotmentClassId = $allocation->allotment_class_id;

        // Compute remaining amount safely
        $usedDbAmount = ObjectDistribution::query()->where('allocation_id', $allocationId)->sum('amount');
        $usedMemoryAmount = self::$allocationUsage[$allocationId] ?? 0.0;
        $remainingAmount = max($allocation->amount - ($usedDbAmount + $usedMemoryAmount), 0);

        // Select expenditure (unused if possible)
        $usedExpenditureIds = ObjectDistribution::query()
            ->where('allocation_id', $allocationId)
            ->pluck('expenditure_id')
            ->all();

        $expenditureId = Expenditure::query()
            ->where('allotment_class_id', $allotmentClassId)
            ->whereNotIn('id', $usedExpenditureIds)
            ->inRandomOrder()
            ->value('id')
            ?? Expenditure::query()
                ->where('allotment_class_id', $allotmentClassId)
                ->inRandomOrder()
                ->value('id');

        // Determine random safe amount
        $maxAmount = min(75000000, $remainingAmount);
        $amount = $maxAmount > 0 ? fake()->randomFloat(2, 1, $maxAmount) : 0.00;

        // Track usage in memory
        self::$allocationUsage[$allocationId] = ($usedMemoryAmount + $amount);

        return [
            'allocation_id' => $allocationId,
            'expenditure_id' => $expenditureId,
            'amount' => $amount,
        ];
    }

    /**
     * Get an allocation with available remaining amount.
     */
    private function getAvailableAllocation(): ?Allocation
    {
        // Try random allocation first
        $allocation = Allocation::query()->inRandomOrder()->first();

        if ($allocation && $this->hasRemaining($allocation)) {
            return $allocation;
        }

        // Otherwise, find another available allocation
        return Allocation::query()
            ->get()
            ->first(fn ($a): bool => $this->hasRemaining($a));
    }

    /**
     * Check if an allocation still has remaining balance.
     */
    private function hasRemaining(Allocation $allocation): bool
    {
        $usedDbAmount = ObjectDistribution::query()->where('allocation_id', $allocation->id)->sum('amount');
        $usedMemoryAmount = self::$allocationUsage[$allocation->id] ?? 0.0;

        return ($allocation->amount - ($usedDbAmount + $usedMemoryAmount)) > 0;
    }
}
