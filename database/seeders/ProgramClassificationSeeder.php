<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\ProgramClassification;
use Illuminate\Database\Seeder;

final class ProgramClassificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            ['name' => 'OO : Access to promotive and preventive health care services improved', 'code' => '310000000000000', 'created_at' => '2025-07-16 14:18:00', 'updated_at' => null],
            ['name' => 'OO : Access to curative and rehabilitative health care services improved', 'code' => '320000000000000', 'created_at' => '2025-07-16 14:18:00', 'updated_at' => null],
            ['name' => 'OO : Access to safe and quality health commodities, devices and facilities ensured', 'code' => '330000000000000', 'created_at' => '2025-07-16 14:18:00', 'updated_at' => null],
            ['name' => 'OO : Access to social health protection assured', 'code' => '340000000000000', 'created_at' => '2025-07-16 14:18:00', 'updated_at' => null],
        ];

        ProgramClassification::query()->insert($programs);
    }
}
