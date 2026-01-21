<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Obligation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Due>
 */
final class DueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => fake()->randomFloat(2, 100, 100000),
            'obligation_id' => Obligation::factory(),
        ];
    }
}
