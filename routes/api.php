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
    Route::post('/auth/profile', [\App\Http\Controllers\Admin\AuthController::class, 'updateProfile']);

    // dashboard
    Route::get('/dashboard/stats', [\App\Http\Controllers\Admin\DashboardController::class, 'stats']);

    // faculty
    Route::get('/faculty', [\App\Http\Controllers\Admin\FacultyController::class, 'index']);
    Route::post('/faculty', [\App\Http\Controllers\Admin\FacultyController::class, 'store']);
    Route::put('/faculty/{id}', [\App\Http\Controllers\Admin\FacultyController::class, 'update']);
    Route::post('/faculty/{id}/archive', [\App\Http\Controllers\Admin\FacultyController::class, 'archive']);
    Route::post('/faculty/{id}/restore', [\App\Http\Controllers\Admin\FacultyController::class, 'restore']);

    // students
    Route::get('/students', [\App\Http\Controllers\Admin\StudentController::class, 'index']);
    Route::post('/students', [\App\Http\Controllers\Admin\StudentController::class, 'store']);
    Route::put('/students/{id}', [\App\Http\Controllers\Admin\StudentController::class, 'update']);
    Route::post('/students/{id}/archive', [\App\Http\Controllers\Admin\StudentController::class, 'archive']);
    Route::post('/students/{id}/restore', [\App\Http\Controllers\Admin\StudentController::class, 'restore']);
    // permanent delete
    Route::delete('/students/{id}', [\App\Http\Controllers\Admin\StudentController::class, 'destroy']);

    // settings - courses
    Route::get('/settings/courses', [\App\Http\Controllers\Admin\SettingsController::class, 'listCourses']);
    Route::post('/settings/courses', [\App\Http\Controllers\Admin\SettingsController::class, 'createCourse']);
    Route::put('/settings/courses/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'updateCourse']);
    Route::post('/settings/courses/{id}/archive', [\App\Http\Controllers\Admin\SettingsController::class, 'archiveCourse']);
    Route::post('/settings/courses/{id}/restore', [\App\Http\Controllers\Admin\SettingsController::class, 'restoreCourse']);
    // permanent delete
    Route::delete('/settings/courses/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'destroyCourse']);

    // settings - departments
    Route::get('/settings/departments', [\App\Http\Controllers\Admin\SettingsController::class, 'listDepartments']);
    Route::post('/settings/departments', [\App\Http\Controllers\Admin\SettingsController::class, 'createDepartment']);
    Route::put('/settings/departments/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'updateDepartment']);
    Route::post('/settings/departments/{id}/archive', [\App\Http\Controllers\Admin\SettingsController::class, 'archiveDepartment']);
    Route::post('/settings/departments/{id}/restore', [\App\Http\Controllers\Admin\SettingsController::class, 'restoreDepartment']);
    // permanent delete
    Route::delete('/settings/departments/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'destroyDepartment']);

    // settings - academic years
    Route::get('/settings/academic-years', [\App\Http\Controllers\Admin\SettingsController::class, 'listAcademicYears']);
    Route::post('/settings/academic-years', [\App\Http\Controllers\Admin\SettingsController::class, 'createAcademicYear']);
    Route::put('/settings/academic-years/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'updateAcademicYear']);
    Route::post('/settings/academic-years/{id}/archive', [\App\Http\Controllers\Admin\SettingsController::class, 'archiveAcademicYear']);
    Route::post('/settings/academic-years/{id}/restore', [\App\Http\Controllers\Admin\SettingsController::class, 'restoreAcademicYear']);
    // permanent delete
    Route::delete('/settings/academic-years/{id}', [\App\Http\Controllers\Admin\SettingsController::class, 'destroyAcademicYear']);
    // pre-delete related counts
    Route::get('/settings/{type}/{id}/related-counts', [\App\Http\Controllers\Admin\SettingsController::class, 'countRelated']);

    // reports
    // legacy routes kept for compatibility
    Route::get('/reports/students', [\App\Http\Controllers\Api\ReportController::class, 'studentsByCourse']);
    Route::get('/reports/faculty', [\App\Http\Controllers\Api\ReportController::class, 'facultyByDepartment']);
    // merged report endpoints
    Route::get('/reports/search', [\App\Http\Controllers\Api\ReportController::class, 'search']);
    Route::get('/reports/person', [\App\Http\Controllers\Api\ReportController::class, 'person']);
});
