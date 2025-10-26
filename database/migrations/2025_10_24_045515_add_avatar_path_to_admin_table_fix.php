<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('admin', 'avatar_path')) {
            Schema::table('admin', function (Blueprint $table) {
                $table->string('avatar_path')->nullable()->after('password');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('admin', 'avatar_path')) {
            Schema::table('admin', function (Blueprint $table) {
                $table->dropColumn('avatar_path');
            });
        }
    }
};