<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Appropriation;
use Illuminate\Database\Seeder;

final class AppropriationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $appropriations = [
            ['name' => 'General Appropriation Act', 'acronym' => 'GAA', 'created_at' => '2025-06-26 13:30:00', 'updated_at' => null],
            ['name' => 'Sub-allotment Advise', 'acronym' => 'SAA', 'created_at' => '2025-06-26 13:30:00', 'updated_at' => null],
            ['name' => 'Special Allotment Release Order', 'acronym' => 'SARO', 'created_at' => '2025-06-26 13:30:00', 'updated_at' => null],
        ];

        Appropriation::query()->insert($appropriations);
    }
}
