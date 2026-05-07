<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'solomon12mays@gmail.com'],
            [
                'name' => 'Solomon Alemayehu',
                'password' => Hash::make('password123'),
                'is_admin' => true,
            ]
        );
    }
}