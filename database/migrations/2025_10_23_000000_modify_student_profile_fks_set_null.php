<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('student_profile', function (Blueprint $table) {
            // drop existing foreign keys
            $table->dropForeign(['course_id']);
            $table->dropForeign(['department_id']);
            $table->dropForeign(['academic_year_id']);

            // make columns nullable
            $table->unsignedBigInteger('course_id')->nullable()->change();
            $table->unsignedBigInteger('department_id')->nullable()->change();
            $table->unsignedBigInteger('academic_year_id')->nullable()->change();

            // re-add foreign keys with ON DELETE SET NULL
            $table->foreign('course_id')->references('course_id')->on('course')->onDelete('set null');
            $table->foreign('department_id')->references('department_id')->on('department')->onDelete('set null');
            $table->foreign('academic_year_id')->references('academic_year_id')->on('academic_year')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('student_profile', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropForeign(['department_id']);
            $table->dropForeign(['academic_year_id']);

            $table->unsignedBigInteger('course_id')->nullable(false)->change();
            $table->unsignedBigInteger('department_id')->nullable(false)->change();
            $table->unsignedBigInteger('academic_year_id')->nullable(false)->change();

            $table->foreign('course_id')->references('course_id')->on('course')->onDelete('restrict');
            $table->foreign('department_id')->references('department_id')->on('department')->onDelete('restrict');
            $table->foreign('academic_year_id')->references('academic_year_id')->on('academic_year')->onDelete('restrict');
        });
    }
};
