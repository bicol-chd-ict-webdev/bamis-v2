<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\ProjectType;
use Illuminate\Database\Seeder;

final class ProjectTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $project_types = [
            ['name' => 'I. General Administration and Support', 'code' => '100000000000000', 'created_at' => '2025-06-25 16:20:00', 'updated_at' => null],
            ['name' => 'II. Support to Operation', 'code' => '200000000000000', 'created_at' => '2025-06-25 16:20:00', 'updated_at' => null],
            ['name' => 'III. Operations', 'code' => '300000000000000', 'created_at' => '2025-06-25 16:20:00', 'updated_at' => null],
        ];

        ProjectType::query()->insert($project_types);
    }
}
