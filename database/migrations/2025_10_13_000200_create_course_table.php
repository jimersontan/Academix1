<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course', function (Blueprint $table) {
            $table->bigIncrements('course_id');
            $table->string('course_name');
            $table->unsignedBigInteger('department_id');
            $table->timestamps();
            $table->timestamp('archived_at')->nullable();

            $table->foreign('department_id')->references('department_id')->on('department')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course');
    }
};


