<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddDisplayIdToProfiles extends Migration
{
    /**
     * Run the migrations.
     * Adds nullable `display_id` to student_profile and faculty_profile and populates existing rows.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('student_profile', function (Blueprint $table) {
            $table->unsignedBigInteger('display_id')->nullable()->unique()->after('student_id');
        });

        Schema::table('faculty_profile', function (Blueprint $table) {
            $table->unsignedBigInteger('display_id')->nullable()->unique()->after('faculty_id');
        });

        // Populate display_id for existing student rows
        DB::transaction(function () {
            $baseStudent = 2310000;
            $students = DB::table('student_profile')->select('student_id')->get();
            foreach ($students as $s) {
                $pk = (int) $s->student_id;
                $display = ($pk >= $baseStudent) ? $pk : ($baseStudent + $pk);
                DB::table('student_profile')->where('student_id', $pk)->update(['display_id' => $display]);
            }

            // Populate display_id for existing faculty rows
            $baseFaculty = 2510000;
            $fac = DB::table('faculty_profile')->select('faculty_id')->get();
            foreach ($fac as $f) {
                $pk = (int) $f->faculty_id;
                $display = ($pk >= $baseFaculty) ? $pk : ($baseFaculty + $pk);
                DB::table('faculty_profile')->where('faculty_id', $pk)->update(['display_id' => $display]);
            }
        });
    }

    /**
     * Reverse the migrations.
     * Drops the display_id columns.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('student_profile', function (Blueprint $table) {
            $table->dropUnique(['display_id']);
            $table->dropColumn('display_id');
        });

        Schema::table('faculty_profile', function (Blueprint $table) {
            $table->dropUnique(['display_id']);
            $table->dropColumn('display_id');
        });
    }
}
