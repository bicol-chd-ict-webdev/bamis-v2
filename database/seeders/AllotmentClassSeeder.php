<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AllotmentClass;
use Illuminate\Database\Seeder;

class AllotmentClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allotment_classes = [
            ['name' => 'Personnel Services', 'acronym' => 'PS', 'code' => '01', 'created_at' => '2025-06-23 09:30:00', 'updated_at' => null],
            ['name' => 'Maintenance and Other Operating Expenses', 'acronym' => 'MOOE', 'code' => '02', 'created_at' => '2025-06-23 09:30:00', 'updated_at' => null],
            ['name' => 'Capital Outlay', 'acronym' => 'CO', 'code' => '06', 'created_at' => '2025-06-23 09:30:00', 'updated_at' => null],
        ];

        AllotmentClass::insert($allotment_classes);
    }
}
