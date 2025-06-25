<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\PapType;
use Illuminate\Database\Seeder;

class PapTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pap_types = [
            ['name' => 'I. GENERAL ADMINISTRATION AND SUPPORT', 'code' => '100000000000000', 'created_at' => '2025-06-25 16:20:00', 'updated_at' => null],
            ['name' => 'II. SUPPORT TO OPERATION', 'code' => '200000000000000', 'created_at' => '2025-06-25 16:20:00', 'updated_at' => null],
            ['name' => 'III. OPERATIONS', 'code' => '300000000000000', 'created_at' => '2025-06-25 16:20:00', 'updated_at' => null],
        ];

        PapType::insert($pap_types);
    }
}
