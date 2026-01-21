<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Division;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Section>
 */
final class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->department(),
            'acronym' => fake()->unique()->lexify('???'),
            'code' => fake()->unique()->numerify('###'),
            'division_id' => Division::factory(),
        ];
    }
}
