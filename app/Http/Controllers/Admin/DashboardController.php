<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FacultyProfile;
use App\Models\StudentProfile;
use App\Models\Course;
use App\Models\Department;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_students' => StudentProfile::whereNull('archived_at')->count(),
            'total_faculty' => FacultyProfile::whereNull('deleted_at')->count(),
            'total_courses' => \App\Models\Course::whereNull('archived_at')->count(),
            'total_departments' => \App\Models\Department::count(),
            // Keep all courses; count only non-archived students
            'students_per_course' => Course::leftJoin('student_profile','course.course_id','=','student_profile.course_id')
                ->selectRaw('course.course_id, course.course_name, COUNT(CASE WHEN student_profile.archived_at IS NULL THEN student_profile.student_id END) as total')
                ->groupBy('course.course_id','course.course_name')->get(),
            // Keep all departments; count only non-deleted faculty
            'faculty_per_department' => Department::leftJoin('faculty_profile','department.department_id','=','faculty_profile.department_id')
                ->selectRaw('department.department_id, department.department_name, COUNT(CASE WHEN faculty_profile.deleted_at IS NULL THEN faculty_profile.faculty_id END) as total')
                ->groupBy('department.department_id','department.department_name')->get(),
        ]);
    }
}
