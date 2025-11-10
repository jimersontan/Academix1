<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add `status` to faculty_profile and `dept_inactive_at` to both profiles
        Schema::table('faculty_profile', function (Blueprint $table) {
            if (!Schema::hasColumn('faculty_profile', 'status')) {
                $table->string('status')->default('active')->after('address');
            }
            if (!Schema::hasColumn('faculty_profile', 'dept_inactive_at')) {
                $table->timestamp('dept_inactive_at')->nullable()->after('deleted_at');
            }
        });

        Schema::table('student_profile', function (Blueprint $table) {
            if (!Schema::hasColumn('student_profile', 'dept_inactive_at')) {
                $table->timestamp('dept_inactive_at')->nullable()->after('archived_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('faculty_profile', function (Blueprint $table) {
            if (Schema::hasColumn('faculty_profile', 'dept_inactive_at')) {
                $table->dropColumn('dept_inactive_at');
            }
            if (Schema::hasColumn('faculty_profile', 'status')) {
                $table->dropColumn('status');
            }
        });

        Schema::table('student_profile', function (Blueprint $table) {
            if (Schema::hasColumn('student_profile', 'dept_inactive_at')) {
                $table->dropColumn('dept_inactive_at');
            }
        });
    }
};
