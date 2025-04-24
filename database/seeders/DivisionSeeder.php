<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            ['id' => 1, 'name' => 'Regional Director and Assistant Regional Director', 'acronym' => 'RD/ARD', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
            ['id' => 2, 'name' => 'Management Support Division', 'acronym' => 'MSD', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
            ['id' => 3, 'name' => 'Regulation, Licensing and Enforcement Division', 'acronym' => 'RLED', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
            ['id' => 4, 'name' => 'Local Health Support Division', 'acronym' => 'LHSD', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
            ['id' => 5, 'name' => 'Bicol South Luzon Sub-National Laboratory', 'acronym' => 'BSL-SNRL', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
            ['id' => 6, 'name' => 'Public Health Preparedness and Response Unit', 'acronym' => 'PHPRU', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
            ['id' => 7, 'name' => 'Strategic Management for Health Development Division', 'acronym' => 'SMHDD', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
            ['id' => 8, 'name' => 'Field Coordination and Management Division', 'acronym' => 'FCMD', 'created_at' => '2025-01-31 17:00:00', 'updated_at' => '2025-01-31 17:00:00'],
        ];

        Division::insert($divisions);
    }
}
