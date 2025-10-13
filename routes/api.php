<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth API
Route::post('/auth/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    // auth
    Route::get('/auth/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
    Route::post('/auth/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);

    // dashboard
    Route::get('/dashboard/stats', [\App\Http\Controllers\Api\DashboardController::class, 'stats']);

    // faculty
    Route::get('/faculty', [\App\Http\Controllers\Api\FacultyController::class, 'index']);
    Route::post('/faculty', [\App\Http\Controllers\Api\FacultyController::class, 'store']);
    Route::put('/faculty/{id}', [\App\Http\Controllers\Api\FacultyController::class, 'update']);
    Route::post('/faculty/{id}/archive', [\App\Http\Controllers\Api\FacultyController::class, 'archive']);

    // students
    Route::get('/students', [\App\Http\Controllers\Api\StudentController::class, 'index']);
    Route::post('/students', [\App\Http\Controllers\Api\StudentController::class, 'store']);
    Route::put('/students/{id}', [\App\Http\Controllers\Api\StudentController::class, 'update']);
    Route::post('/students/{id}/archive', [\App\Http\Controllers\Api\StudentController::class, 'archive']);

    // settings - courses
    Route::get('/settings/courses', [\App\Http\Controllers\Api\SettingsController::class, 'listCourses']);
    Route::post('/settings/courses', [\App\Http\Controllers\Api\SettingsController::class, 'createCourse']);
    Route::put('/settings/courses/{id}', [\App\Http\Controllers\Api\SettingsController::class, 'updateCourse']);
    Route::post('/settings/courses/{id}/archive', [\App\Http\Controllers\Api\SettingsController::class, 'archiveCourse']);

    // settings - departments
    Route::get('/settings/departments', [\App\Http\Controllers\Api\SettingsController::class, 'listDepartments']);
    Route::post('/settings/departments', [\App\Http\Controllers\Api\SettingsController::class, 'createDepartment']);
    Route::put('/settings/departments/{id}', [\App\Http\Controllers\Api\SettingsController::class, 'updateDepartment']);
    Route::post('/settings/departments/{id}/archive', [\App\Http\Controllers\Api\SettingsController::class, 'archiveDepartment']);

    // settings - academic years
    Route::get('/settings/academic-years', [\App\Http\Controllers\Api\SettingsController::class, 'listAcademicYears']);
    Route::post('/settings/academic-years', [\App\Http\Controllers\Api\SettingsController::class, 'createAcademicYear']);
    Route::put('/settings/academic-years/{id}', [\App\Http\Controllers\Api\SettingsController::class, 'updateAcademicYear']);
    Route::post('/settings/academic-years/{id}/archive', [\App\Http\Controllers\Api\SettingsController::class, 'archiveAcademicYear']);

    // reports
    Route::get('/reports/students', [\App\Http\Controllers\Api\ReportController::class, 'studentsByCourse']);
    Route::get('/reports/faculty', [\App\Http\Controllers\Api\ReportController::class, 'facultyByDepartment']);
});
