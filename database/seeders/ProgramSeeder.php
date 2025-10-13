<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\AppropriationSource;
use App\Models\Program;
use Illuminate\Database\Seeder;

final class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            ['name' => 'Health Policy and Standards Development Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '310100000000000', 'program_classification_id' => 1, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Systems Strengthening Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '310200000000000', 'program_classification_id' => 1, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Public Health Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '310301000000000', 'program_classification_id' => 1, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Epidemiology and Surveillance Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '310400000000000', 'program_classification_id' => 1, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Emergency Management Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '310500000000000', 'program_classification_id' => 1, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Facilities Operation Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '320100000000000', 'program_classification_id' => 2, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Regulatory Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '330100000000000', 'program_classification_id' => 3, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Social Health Protection Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => '340100000000000', 'program_classification_id' => 4, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Pension and Graduity Fund', 'appropriation_source' => AppropriationSource::SPECIAL, 'code' => '1101407', 'program_classification_id' => null, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Miscellaneous Personnel Benefits Fund', 'appropriation_source' => AppropriationSource::SPECIAL, 'code' => '1101406', 'program_classification_id' => null, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Retirement and Life Insurance Premium', 'appropriation_source' => AppropriationSource::AUTOMATIC, 'code' => '104102', 'program_classification_id' => null, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
        ];

        Program::query()->insert($programs);
    }
}
