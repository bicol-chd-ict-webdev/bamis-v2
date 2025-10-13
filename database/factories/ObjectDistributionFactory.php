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
        // Pick a random allocation
        $allocation = Allocation::query()->inRandomOrder()->first();

        throw_unless($allocation, RuntimeException::class, 'No allocations found. Please seed allocations first.');

        $allocationId = $allocation->id;
        $allotmentClassId = $allocation->allotment_class_id;

        // Get DB-saved used amount + in-memory tracking
        $usedDbAmount = ObjectDistribution::query()->where('allocation_id', $allocationId)->sum('amount');
        $usedMemoryAmount = self::$allocationUsage[$allocationId] ?? 0.0;
        $usedTotal = $usedDbAmount + $usedMemoryAmount;

        // Remaining balance of allocation
        $remainingAmount = max($allocation->amount - $usedTotal, 0);

        // If allocation already full, skip
        if ($remainingAmount <= 0) {
            // Pick another allocation with available balance
            $allocation = Allocation::query()
                ->get()
                ->first(fn ($a): bool => ($a->amount - (
                    ObjectDistribution::query()->where('allocation_id', $a->id)->sum('amount')
                    + (self::$allocationUsage[$a->id] ?? 0)
                )) > 0
                );

            throw_unless($allocation, RuntimeException::class, 'All allocations are fully distributed. Stopping factory generation.');

            $allocationId = $allocation->id;
            $allotmentClassId = $allocation->allotment_class_id;
            $remainingAmount = max($allocation->amount - (
                ObjectDistribution::query()->where('allocation_id', $allocationId)->sum('amount')
                + (self::$allocationUsage[$allocationId] ?? 0)
            ), 0);
        }

        // Get unused or fallback expenditure
        $usedExpenditureIds = ObjectDistribution::query()->where('allocation_id', $allocationId)
            ->pluck('expenditure_id')
            ->all();

        $expenditureId = Expenditure::query()->where('allotment_class_id', $allotmentClassId)
            ->whereNotIn('id', $usedExpenditureIds)
            ->inRandomOrder()
            ->value('id')
            ?? Expenditure::query()->where('allotment_class_id', $allotmentClassId)
                ->inRandomOrder()
                ->value('id');

        // Determine a random safe amount
        $maxAmount = min(75000000, $remainingAmount);
        $amount = $maxAmount > 0
            ? fake()->randomFloat(2, 1, $maxAmount)
            : 0.00;

        // Track usage in memory
        self::$allocationUsage[$allocationId] = ($usedMemoryAmount + $amount);

        return [
            'allocation_id' => $allocationId,
            'expenditure_id' => $expenditureId,
            'amount' => $amount,
        ];
    }
}
