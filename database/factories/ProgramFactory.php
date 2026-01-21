<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ProgramClassification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Program>
 */
final class ProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(4, true),
            'appropriation_source' => fake()->randomElement([1, 2, 3]),
            'code' => fake()->unique()->numerify('##########'),
            'program_classification_id' => ProgramClassification::factory(),
        ];
    }
}
