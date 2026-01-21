<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\NorsaTypeEnum;
use App\Enums\RecipientEnum;
use App\Models\Allocation;
use App\Models\Obligation;
use App\Services\Obligation\OrasGeneratorService;
use Illuminate\Database\Eloquent\Factories\Factory;
use RuntimeException;

/**
 * @extends Factory<Obligation>
 */
final class ObligationFactory extends Factory
{
    /**
     * Track allocation obligations usage across factory runs.
     *
     * @var array<int, float>
     */
    private static array $allocationUsage = [];

    /**
     * Track running obligation series per allocation.
     *
     * @var array<int, int>
     */
    private static array $seriesCache = [];

    public function definition(): array
    {
        $isCancelled = fake()->boolean(10);
        $isTransferred = fake()->boolean(10);
        $recipient = $isTransferred ? fake()->randomElement(array_column(RecipientEnum::cases(), 'value')) : null;

        // Find an allocation with available balance
        $allocation = Allocation::query()->whereHas('officeAllotments')
            ->whereHas('objectDistributions')
            ->get()
            ->first(fn ($a): bool => ($a->amount - (
                Obligation::query()->where('allocation_id', $a->id)->where('is_cancelled', false)->sum('amount')
                + (self::$allocationUsage[$a->id] ?? 0)
            )) > 0
            );

        throw_unless($allocation, RuntimeException::class, 'All allocations are fully obligated. Stopping ObligationFactory.');

        // Compute used & remaining balances
        $usedDbAmount = Obligation::query()->where('allocation_id', $allocation->id)
            ->where('is_cancelled', false)
            ->sum('amount');

        $usedMemoryAmount = self::$allocationUsage[$allocation->id] ?? 0.0;
        $usedTotal = $usedDbAmount + $usedMemoryAmount;

        $remainingBalance = max($allocation->amount - $usedTotal, 0);

        // Random related models
        $officeAllotmentId = $allocation->officeAllotments()->inRandomOrder()->value('id');
        $objectDistributionId = $allocation->objectDistributions()->inRandomOrder()->value('id');

        // Pick Norsa type (10% chance)
        $norsaType = fake()->boolean(10) ? fake()->randomElement(array_column(NorsaTypeEnum::cases(), 'value')) : null;

        // Define safe amount
        $maxAmount = min(75000000, $remainingBalance);
        $amount = $norsaType
            ? -1 * fake()->randomFloat(2, 10000, 1000000)
            : fake()->randomFloat(2, 10000, $maxAmount);

        // Ensure it doesn’t exceed remaining balance
        if (! $norsaType && $amount > $remainingBalance) {
            $amount = $remainingBalance;
        }

        // Register this obligation’s amount in memory tracker
        self::$allocationUsage[$allocation->id] = $usedMemoryAmount + $amount;

        // Date & ORAS number
        $date = fake()->dateTimeBetween('2025-01-01', '2025-12-31')->format('Y-m-d');

        $orasNumber = resolve(OrasGeneratorService::class)->generate([
            'allocation_id' => $allocation->id,
            'date' => $date,
        ]);

        return [
            'oras_number' => $orasNumber,
            'series' => $this->getNextSeries($allocation->id),
            'amount' => $isCancelled ? 0 : $amount,
            'date' => $date,
            'creditor' => $isCancelled ? 'CANCELLED' : fake()->sentence(),
            'particulars' => $isCancelled ? 'CANCELLED' : fake()->text(),
            'is_cancelled' => $isCancelled,
            'is_transferred' => $isTransferred,
            'recipient' => $recipient,
            'norsa_type' => $norsaType,
            'tagged_obligation_id' => fake()->boolean(20)
                ? Obligation::query()->whereNull('norsa_type')->inRandomOrder()->value('id')
                : null,
            'dtrak_number' => fake()->boolean(50) ? fake()->word() : null,
            'reference_number' => fake()->boolean(50) ? fake()->word() : null,
            'allocation_id' => $allocation->id,
            'office_allotment_id' => $officeAllotmentId,
            'object_distribution_id' => $objectDistributionId,
        ];
    }

    private function getNextSeries(int $allocationId): string
    {
        if (! isset(self::$seriesCache[$allocationId])) {
            $max = Obligation::query()->where('allocation_id', $allocationId)->max('series');
            self::$seriesCache[$allocationId] = $max ? (int) $max : 0;
        }

        self::$seriesCache[$allocationId]++;

        return mb_str_pad((string) self::$seriesCache[$allocationId], 4, '0', STR_PAD_LEFT);
    }
}
