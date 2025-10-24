<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class ResetAdminPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:reset-password {username?} {password=admin123}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset an admin user password. Usage: php artisan admin:reset-password {username?} {password=admin123}';

    public function handle()
    {
        $username = $this->argument('username');
        $password = $this->argument('password') ?? 'admin123';

        if ($username) {
            $admin = Admin::where('username', $username)->first();
            if (! $admin) {
                $this->error("Admin user with username '{$username}' not found.");
                return 1;
            }
        } else {
            $admin = Admin::first();
            if (! $admin) {
                $this->error('No admin users exist in the database.');
                return 1;
            }
            $username = $admin->username;
        }

        $admin->password = Hash::make($password);
        $admin->save();

        $this->info("Password for admin user '{$username}' has been reset to: {$password}");
        $this->warn('For security, change this password after logging in.');
        return 0;
    }
}
