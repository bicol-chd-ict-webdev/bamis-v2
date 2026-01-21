<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AllotmentClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expenditure>
 */
final class ExpenditureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'code' => fake()->unique()->numerify('5-02-##-###'),
            'allotment_class_id' => AllotmentClass::factory(),
        ];
    }
}
