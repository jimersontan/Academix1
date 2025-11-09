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
Route::post('/auth/login', [\App\Http\Controllers\Admin\AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    // auth
    Route::get('/auth/me', [\App\Http\Controllers\Admin\AuthController::class, 'me']);
    Route::post('/auth/logout', [\App\Http\Controllers\Admin\AuthController::class, 'logout']);

    // dashboard
    Route::get('/dashboard/stats', [\App\Http\Controllers\Admin\DashboardController::class, 'stats']);

    // faculty
    Route::get('/faculty', [\App\Http\Controllers\Admin\FacultyController::class, 'index']);
    Route::get('/faculty/next-id', [\App\Http\Controllers\Admin\FacultyController::class, 'nextId']);
    Route::post('/faculty', [\App\Http\Controllers\Admin\FacultyController::class, 'store']);
    Route::put('/faculty/{id}', [\App\Http\Controllers\Admin\FacultyController::class, 'update']);
    Route::post('/faculty/{id}/archive', [\App\Http\Controllers\Admin\FacultyController::class, 'archive']);
    Route::post('/faculty/{id}/restore', [\App\Http\Controllers\Admin\FacultyController::class, 'restore']);
    Route::post('/faculty/{id}/delete', [\App\Http\Controllers\Admin\FacultyController::class, 'destroy']);

    // students
    Route::get('/students', [\App\Http\Controllers\Admin\StudentController::class, 'index']);
    Route::get('/students/next-id', [\App\Http\Controllers\Admin\StudentController::class, 'nextId']);
    Route::post('/students', [\App\Http\Controllers\Admin\StudentController::class, 'store']);
    Route::put('/students/{id}', [\App\Http\Controllers\Admin\StudentController::class, 'update']);
    Route::post('/students/{id}/archive', [\App\Http\Controllers\Admin\StudentController::class, 'archive']);
    Route::post('/students/{id}/restore', [\App\Http\Controllers\Admin\StudentController::class, 'restore']);
    Route::post('/students/{id}/delete', [\App\Http\Controllers\Admin\StudentController::class, 'destroy']);

    // settings - courses
    Route::get('/settings/courses', [\App\Http\Controllers\Admin\SettingsController::class, 'listCourses']);
    Route::post('/settings/courses', [\App\Http\Controllers\Admin\SettingsController::class, 'createCourse']);
    Route::put('/settings/courses/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'updateCourse']);
    Route::post('/settings/courses/{id}/archive', [\App\Http\Controllers\Admin\SettingsController::class, 'archiveCourse']);
    Route::post('/settings/courses/{id}/restore', [\App\Http\Controllers\Admin\SettingsController::class, 'restoreCourse']);

    // settings - departments
    Route::get('/settings/departments', [\App\Http\Controllers\Admin\SettingsController::class, 'listDepartments']);
    Route::post('/settings/departments', [\App\Http\Controllers\Admin\SettingsController::class, 'createDepartment']);
    Route::put('/settings/departments/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'updateDepartment']);
    Route::post('/settings/departments/{id}/archive', [\App\Http\Controllers\Admin\SettingsController::class, 'archiveDepartment']);
    Route::post('/settings/departments/{id}/restore', [\App\Http\Controllers\Admin\SettingsController::class, 'restoreDepartment']);

    // settings - academic years
    Route::get('/settings/academic-years', [\App\Http\Controllers\Admin\SettingsController::class, 'listAcademicYears']);
    Route::post('/settings/academic-years', [\App\Http\Controllers\Admin\SettingsController::class, 'createAcademicYear']);
    Route::put('/settings/academic-years/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'updateAcademicYear']);
    Route::post('/settings/academic-years/{id}/archive', [\App\Http\Controllers\Admin\SettingsController::class, 'archiveAcademicYear']);
    Route::post('/settings/academic-years/{id}/restore', [\App\Http\Controllers\Admin\SettingsController::class, 'restoreAcademicYear']);

    // reports
    Route::get('/reports/students', [\App\Http\Controllers\Admin\ReportController::class, 'getStudents']);
    Route::get('/reports/faculty', [\App\Http\Controllers\Admin\ReportController::class, 'getFaculty']);
    Route::get('/reports/courses', [\App\Http\Controllers\Admin\ReportController::class, 'getCourses']);
    Route::get('/reports/departments', [\App\Http\Controllers\Admin\ReportController::class, 'getDepartments']);

    // profile
    Route::get('/me', [\App\Http\Controllers\Admin\ProfileController::class, 'show']);
    Route::put('/me', [\App\Http\Controllers\Admin\ProfileController::class, 'update']);
    Route::post('/me/password', [\App\Http\Controllers\Admin\ProfileController::class, 'changePassword']);
    Route::post('/me/avatar', [\App\Http\Controllers\Admin\ProfileController::class, 'uploadAvatar']);
});
