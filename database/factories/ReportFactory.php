<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\QueueStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
final class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'filename' => fake()->word().'.pdf',
            'type' => fake()->word(),
            'status' => fake()->randomElement(QueueStatusEnum::cases()),
            'download_link' => fake()->url(),
            'expires_at' => fake()->dateTimeBetween('now', '+1 week'),
            'error' => null,
        ];
    }
}
