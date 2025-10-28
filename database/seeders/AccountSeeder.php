<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

final class AccountSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::create(['name' => 'Administrator']);
        $budget = Role::create(['name' => 'Budget']);

        $password = bcrypt('password');

        $users = [
            [
                'role' => $admin,
                'details' => [
                    'name' => 'ICT Web Dev Administrator',
                    'email' => 'ict.webdev@bicol.doh.gov.ph',
                    'email_verified_at' => now(),
                    'password' => $password,
                    'remember_token' => Str::random(100),
                    'designation' => 'Computer Programmer II',
                ],
            ],
            [
                'role' => $budget,
                'details' => [
                    'name' => 'Budget Officer',
                    'email' => 'budget@bicol.doh.gov.ph',
                    'email_verified_at' => now(),
                    'password' => $password,
                    'remember_token' => Str::random(100),
                    'designation' => 'Administrative Officer V',
                ],
            ],
        ];

        foreach ($users as $userData) {
            $user = User::query()->create($userData['details']);
            $user->assignRole($userData['role']);
        }
    }
}
