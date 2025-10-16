<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $existing = DB::table('admin')->where('username', 'admin')->first();
        if ($existing) {
            // Ensure known credentials for development: admin / admin123
            DB::table('admin')->where('admin_id', $existing->admin_id)->update([
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
            ]);
        } else {
            DB::table('admin')->insert([
                'username' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'created_at' => now(),
            ]);
        }
    }
}


