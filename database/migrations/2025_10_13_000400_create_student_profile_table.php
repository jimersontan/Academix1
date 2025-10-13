<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_profile', function (Blueprint $table) {
            $table->bigIncrements('student_id');
            $table->string('f_name');
            $table->string('m_name')->nullable();
            $table->string('l_name');
            $table->string('suffix')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('sex', 10)->nullable();
            $table->string('phone_number')->nullable();
            $table->string('email_address')->nullable();
            $table->string('address')->nullable();
            $table->string('status')->default('active');
            $table->unsignedBigInteger('department_id');
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('academic_year_id');
            $table->string('year_level');
            $table->timestamps();
            $table->timestamp('archived_at')->nullable();

            $table->foreign('department_id')->references('department_id')->on('department')->onDelete('restrict');
            $table->foreign('course_id')->references('course_id')->on('course')->onDelete('restrict');
            $table->foreign('academic_year_id')->references('academic_year_id')->on('academic_year')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_profile');
    }
};


