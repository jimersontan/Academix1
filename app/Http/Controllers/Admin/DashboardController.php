<?php

namespace App\Http\Controllers\Api;

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
            'total_students' => StudentProfile::count(),
            'total_faculty' => FacultyProfile::count(),
            'students_per_course' => Course::leftJoin('student_profile','course.course_id','=','student_profile.course_id')
                ->selectRaw('course.course_id, course.course_name, COUNT(student_profile.student_id) as total')
                ->groupBy('course.course_id','course.course_name')->get(),
            'faculty_per_department' => Department::leftJoin('faculty_profile','department.department_id','=','faculty_profile.department_id')
                ->selectRaw('department.department_id, department.department_name, COUNT(faculty_profile.faculty_id) as total')
                ->groupBy('department.department_id','department.department_name')->get(),
        ]);
    }
}


