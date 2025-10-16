<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Disbursement;
use App\Models\Obligation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Disbursement>
 */
final class DisbursementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $obligation = Obligation::query()
            ->with('disbursements')
            ->inRandomOrder()
            ->first();

        // Compute the total disbursed so far using accessor
        $totalDisbursed = $obligation->disbursements->sum(fn (Disbursement $d): float => (float) $d->total_amount);
        $remaining = max(0, (float) $obligation->amount - $totalDisbursed);

        // Random deductions — keep them small relative to remaining
        $tax = fake()->optional(0.2)->randomFloat(2, 1, $remaining * 0.05);
        $retention = fake()->optional(0.2)->randomFloat(2, 1, $remaining * 0.05);
        $penalty = fake()->optional(0.2)->randomFloat(2, 1, $remaining * 0.05);
        $absences = fake()->optional(0.2)->randomFloat(2, 1, $remaining * 0.05);
        $otherDeductions = fake()->optional(0.2)->randomFloat(2, 1, $remaining * 0.05);

        // Calculate a net amount that will keep total <= remaining
        $deductionsTotal = collect([$tax, $retention, $penalty, $absences, $otherDeductions])
            ->filter()
            ->sum();

        $maxNet = max(0, $remaining - $deductionsTotal);
        $netAmount = $maxNet > 0 ? fake()->randomFloat(2, 10, $maxNet) : 0.00;

        $date = fake()->dateTimeBetween('2025-01-01', '2025-12-31')->format('Y-m-d');

        // 20% chance the disbursement has a check date
        $hasCheck = fake()->boolean(20);
        $checkDate = $hasCheck ? $date : null;
        $checkNumber = $hasCheck ? $this->faker->unique()->numerify('#######') : null;

        return [
            'obligation_id' => $obligation->id,
            'net_amount' => $netAmount,
            'date' => $date,
            'check_date' => $checkDate,
            'check_number' => $checkNumber,
            'tax' => $tax,
            'retention' => $retention,
            'penalty' => $penalty,
            'absences' => $absences,
            'other_deductions' => $otherDeductions,
            'remarks' => fake()->optional(0.2)->sentence(),
        ];
    }
}
