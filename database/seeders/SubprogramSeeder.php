<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Subprogram;
use Illuminate\Database\Seeder;

final class SubprogramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subprograms = [
            ['name' => 'Service Delivery Sub-Program', 'program_id' => 2, 'code' => '310201000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Health Human Resource Sub-Program', 'program_id' => 2, 'code' => '310202000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Health Promotion Sub-Program', 'program_id' => 2, 'code' => '310203000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Public Health Management Sub-Program', 'program_id' => 3, 'code' => '310301000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Environmental and Occupational Health Sub-Program', 'program_id' => 3, 'code' => '310302000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Family Health Sub-Program', 'program_id' => 3, 'code' => '310304000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Prevention and Control of Communicable Diseases Sub-Program', 'program_id' => 3, 'code' => '310308000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Prevention and Control of Non-Communicable Diseases Sub-Program', 'program_id' => 3, 'code' => '310309000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Curative Health Care Sub-Program', 'program_id' => 6, 'code' => '320101000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Rehabilitative Health Care Sub-Program', 'program_id' => 6, 'code' => '320102000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Health Facilities and Services Regulation Sub-Program', 'program_id' => 7, 'code' => '330101000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Consumer Health and Welfare Sub-Program', 'program_id' => 7, 'code' => '330102000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
            ['name' => 'Routine Quarantine Services Sub-Program', 'program_id' => 7, 'code' => '330103000000000', 'created_at' => '2025-06-26 10:00:00', 'updated_at' => null],
        ];

        Subprogram::query()->insert($subprograms);
    }
}
