<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('faculty_profile', function (Blueprint $table) {
            if (!Schema::hasColumn('faculty_profile', 'status')) {
                $table->string('status')->default('active')->after('address');
            }
        });
    }

    public function down(): void
    {
        Schema::table('faculty_profile', function (Blueprint $table) {
            if (Schema::hasColumn('faculty_profile', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};
