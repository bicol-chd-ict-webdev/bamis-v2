<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\AppropriationSource;
use App\Models\AllotmentClass;
use App\Models\Appropriation;
use App\Models\LineItem;
use App\Models\Program;
use App\Models\ProgramClassification;
use App\Models\ProjectType;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Allocation>
 */
final class AllocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $appropriationId = Appropriation::query()->inRandomOrder()->value('id');
        $projectTypeId = ProjectType::query()->inRandomOrder()->value('id');
        $appropriationSource = $this->faker->randomElement(array_column(AppropriationSource::cases(), 'value'));

        $departmentOrder = null;
        $saaNumber = null;
        $dateReceived = null;

        if ($appropriationId === 2) {
            $year = now()->year;
            $month = mb_str_pad((string) fake()->numberBetween(1, 12), 2, '0', STR_PAD_LEFT);
            $randomDigits = mb_str_pad((string) fake()->numberBetween(0, 9999), 4, '0', STR_PAD_LEFT);

            $departmentOrder = "{$year}-{$randomDigits}";
            $saaNumber = "{$year}-{$month}-{$randomDigits}";

            // ✅ Make date_received match the same month
            $day = fake()->numberBetween(1, 28); // safe for all months
            $dateReceived = CarbonImmutable::create($year, (int) $month, $day)->format('Y-m-d');
        } else {
            // default random date if not appropriation 2
            $dateReceived = fake()
                ->dateTimeBetween(
                    CarbonImmutable::create(2025, 1, 1),
                    CarbonImmutable::create(2025, 12, 31)
                )
                ->format('Y-m-d');
        }

        $saroNumber = null;
        if ($appropriationId === 3) {
            $year = now()->format('y'); // two-digit year
            $randomDigits = mb_str_pad((string) fake()->numberBetween(0, 999999), 6, '0', STR_PAD_LEFT);
            $saroNumber = "{$year}-{$randomDigits}";
        }

        $programClassificationId = null;
        $programId = null;
        $subprogramId = null;
        $allotmentClassId = $this->faker->randomElement(AllotmentClass::query()->pluck('id')->toArray());

        // condition to decide if we assign program-related data
        $shouldAssignProgramData =
            $projectTypeId === 3 ||
            in_array($appropriationSource, [
                AppropriationSource::NEW->value,
                AppropriationSource::SPECIAL->value,
            ], true);

        if ($shouldAssignProgramData) {
            $programClassificationId = ProgramClassification::query()->inRandomOrder()->value('id');

            // randomly choose to assign a program (50% chance)
            if (fake()->boolean(50)) {
                $program = Program::query()->inRandomOrder()->first();
                $programId = $program?->id;

                // only attempt subprogram if program exists and has related subprograms
                // 50% chance to assign a subprogram
                if ($program && $program->subprograms()->exists() && fake()->boolean(50)) {
                    $subprogramId = $program->subprograms()->inRandomOrder()->value('id');
                }
            }
        }

        // override logic if AUTOMATIC
        if ($appropriationSource === AppropriationSource::AUTOMATIC->value) {
            $allotmentClassId = 1;
            $programId = 11;
            $programClassificationId = null;
            $subprogramId = null;
        }

        // If the appropriation_source key is AUTOMATIC, the allotment_class_id must be always 1 and the program_id is 11
        return [
            'amount' => $this->faker->randomFloat(2, 1, 75000000),
            'date_received' => $dateReceived,
            'appropriation_source' => $this->faker->randomElement(array_column(AppropriationSource::cases(), 'value')),
            'line_item_id' => LineItem::query()->inRandomOrder()->value('id'),
            'appropriation_id' => $appropriationId, // GAA, SAA, SARO
            'appropriation_type_id' => fake()->boolean(80) ? 1 : 2, // CURRENT, CONAP
            'allotment_class_id' => $allotmentClassId, // PS, MOOE, CO
            'department_order' => $departmentOrder, // current year - four random digits e.g. 2025-0012
            'saa_number' => $saaNumber, // current year - random month (two digits) - four random digits e.g. 2025-03-0123
            'particulars' => $appropriationId === 2 ? $this->faker->text() : null,
            'project_type_id' => $projectTypeId, // GAS, STO, OPERATION
            'program_classification_id' => $programClassificationId, // random ID if $projectTypeId is 3
            'saro_number' => $saroNumber, // current year (two digits only) - random 6 digits e.g. 25-001234
            'program_id' => $programId,
            'subprogram_id' => $subprogramId, // might be null or not depending on the value of program_id
        ];
    }
}
