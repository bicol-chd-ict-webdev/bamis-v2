<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Allocation;
use App\Models\OfficeAllotment;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;
use RuntimeException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OfficeAllotment>
 */
final class OfficeAllotmentFactory extends Factory
{
    /**
     * Track allocation usage in-memory during seeding.
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
        $allocation = Allocation::query()->inRandomOrder()->first();

        throw_unless($allocation, RuntimeException::class, 'No allocations found. Please seed allocations first.');

        $section = Section::query()->inRandomOrder()->first();

        // Calculate used and remaining allocation amount
        $usedDbAmount = OfficeAllotment::query()->where('allocation_id', $allocation->id)->sum('amount');
        $usedMemoryAmount = self::$allocationUsage[$allocation->id] ?? 0.0;
        $usedTotal = $usedDbAmount + $usedMemoryAmount;

        $remainingAmount = max($allocation->amount - $usedTotal, 0);

        // If no remaining balance, find another allocation
        if ($remainingAmount <= 0) {
            $allocation = Allocation::all()
                ->first(fn ($a): bool => ($a->amount - (
                    OfficeAllotment::query()->where('allocation_id', $a->id)->sum('amount')
                    + (self::$allocationUsage[$a->id] ?? 0)
                )) > 0
                );

            throw_unless($allocation, RuntimeException::class, 'All allocations are fully allotted. Stopping factory generation.');

            $usedDbAmount = OfficeAllotment::query()->where('allocation_id', $allocation->id)->sum('amount');
            $usedMemoryAmount = self::$allocationUsage[$allocation->id] ?? 0.0;
            $usedTotal = $usedDbAmount + $usedMemoryAmount;
            $remainingAmount = max($allocation->amount - $usedTotal, 0);
        }

        // Safe random amount
        $maxAmount = min(75000000, $remainingAmount);
        $amount = $maxAmount > 0
            ? fake()->randomFloat(2, 1, $maxAmount)
            : 0.00;

        // Track in-memory usage
        self::$allocationUsage[$allocation->id] = $usedMemoryAmount + $amount;

        // Generate WFP codes
        $appropriationId = $allocation->appropriation_id;
        $appropriationTypeId = $allocation->appropriation_type_id;
        $saaNumber = preg_replace('/\D/', '', $allocation->saa_number ?? '0000');
        $last4 = in_array(mb_substr($saaNumber, -4), ['', '0'], true) ? mb_str_pad((string) fake()->numberBetween(0, 9999), 4, '0', STR_PAD_LEFT) : mb_substr($saaNumber, -4);

        $prefix = match (true) {
            $appropriationId === 2 && $appropriationTypeId === 1 => 'CS'.$last4,
            $appropriationId === 2 && $appropriationTypeId === 2 => 'CA',
            default => null,
        };

        // Generate randomized suffix (e.g., 1, 1.a, 1.1.a)
        $suffixBase = (string) fake()->numberBetween(1, 50);
        $suffix = $suffixBase;
        if (fake()->boolean(20)) {
            $suffix .= '.'.fake()->randomElement(range('a', 'z'));
        }

        if (fake()->boolean(20)) {
            $suffix .= '.'.fake()->numberBetween(1, 3).'.'.fake()->randomElement(range('a', 'z'));
        }

        return [
            'allocation_id' => $allocation->id,
            'section_id' => $section->id,
            'amount' => $amount,
            'wfp_prefix_code' => $prefix,
            'wfp_suffix_code' => $suffix,
        ];
    }
}
