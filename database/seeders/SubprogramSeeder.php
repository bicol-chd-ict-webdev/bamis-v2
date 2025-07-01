<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Subprogram;
use Illuminate\Database\Seeder;

class SubprogramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subprograms = [
            ['name' => 'Service Delivery Sub-Program', 'program_id' => 2, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Health Human Resource Sub-Program', 'program_id' => 2, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Health Promotion Sub-Program', 'program_id' => 2, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Public Health Management Sub-Program', 'program_id' => 3, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Environmental and Occupational Health Sub-Program', 'program_id' => 3, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Family Health Sub-Program', 'program_id' => 3, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Prevention and Control of Communicable Diseases Sub-Program', 'program_id' => 3, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Prevention and Control of Non-Communicable Diseases Sub-Program', 'program_id' => 3, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Curative Health Care Sub-Program', 'program_id' => 6, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Rehabilitative Health Care Sub-Program', 'program_id' => 6, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Health Facilities and Services Regulation Sub-Program', 'program_id' => 7, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Consumer Health and Welfare Sub-Program', 'program_id' => 7, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Routine Quarantine Services Sub-Program', 'program_id' => 7, 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
        ];

        Subprogram::insert($subprograms);
    }
}
