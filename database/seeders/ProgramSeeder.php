<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\AppropriationSource;
use App\Enums\ProgramClassification;
use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            ['name' => 'Health Policy and Standards Development Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::PROMOTIVE, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Systems Strengthening Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::PROMOTIVE, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Public Health Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::PROMOTIVE, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Epidemiology and Surveillance Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::PROMOTIVE, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Emergency Management Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::PROMOTIVE, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Facilities Operation Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::CURATIVE, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Health Regulatory Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::SAFE, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Social Health Protection Program', 'appropriation_source' => AppropriationSource::NEW, 'code' => null, 'program_classification' => ProgramClassification::SOCIAL, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Pension and Graduity Fund', 'appropriation_source' => AppropriationSource::SPECIAL, 'code' => '1101407', 'program_classification' => null, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Miscellaneous Personnel Benefits Fund', 'appropriation_source' => AppropriationSource::SPECIAL, 'code' => '1101406', 'program_classification' => null, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
            ['name' => 'Retirement and Life Insurance Premium', 'appropriation_source' => AppropriationSource::AUTOMATIC, 'code' => '104102', 'program_classification' => null, 'created_at' => '2025-06-26 08:15:00', 'updated_at' => null],
        ];

        Program::insert($programs);
    }
}
