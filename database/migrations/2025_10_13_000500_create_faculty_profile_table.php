<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faculty_profile', function (Blueprint $table) {
            $table->bigIncrements('faculty_id');
            $table->string('f_name');
            $table->string('m_name')->nullable();
            $table->string('l_name');
            $table->string('suffix')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('sex', 10)->nullable();
            $table->string('phone_number')->nullable();
            $table->string('email_address')->nullable();
            $table->string('address')->nullable();
            $table->string('position')->nullable();
            $table->unsignedBigInteger('department_id');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();

            $table->foreign('department_id')->references('department_id')->on('department')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faculty_profile');
    }
};


