<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AccountSeeder::class,
            DivisionSeeder::class,
            SectionSeeder::class,
            LineItemSeeder::class,
            AllotmentClassSeeder::class,
            ExpenditureSeeder::class,
            ProjectTypeSeeder::class,
            ProgramClassificationSeeder::class,
            ProgramSeeder::class,
            SubprogramSeeder::class,
            AppropriationSeeder::class,
            AppropriationTypeSeeder::class,
        ]);
    }
}
