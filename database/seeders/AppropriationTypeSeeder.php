<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AppropriationType;
use Illuminate\Database\Seeder;

final class AppropriationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $appropriation_types = [
            ['name' => 'Current Appropriation', 'acronym' => 'CURRENT', 'code' => '101101', 'created_at' => '2025-06-26 14:20:00', 'updated_at' => null],
            ['name' => 'Continuing Appropriation', 'acronym' => 'CONAP', 'code' => '102101', 'created_at' => '2025-06-26 14:20:00', 'updated_at' => null],
        ];

        AppropriationType::query()->insert($appropriation_types);
    }
}
