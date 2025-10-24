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
            // only count students that are not archived and marked active
            'total_students' => StudentProfile::whereNull('archived_at')->where('status','active')->count(),
            // only count faculty that are not deleted/archived and marked active
            'total_faculty' => FacultyProfile::whereNull('deleted_at')->where('status','active')->count(),
            'students_per_course' => Course::leftJoin('student_profile','course.course_id','=','student_profile.course_id')
                ->whereNull('student_profile.archived_at')
                ->where('student_profile.status','active')
                ->selectRaw('course.course_id, course.course_name, COUNT(student_profile.student_id) as total')
                ->groupBy('course.course_id','course.course_name')->get(),
            'faculty_per_department' => Department::leftJoin('faculty_profile','department.department_id','=','faculty_profile.department_id')
                ->whereNull('faculty_profile.deleted_at')
                ->where('faculty_profile.status','active')
                ->selectRaw('department.department_id, department.department_name, COUNT(faculty_profile.faculty_id) as total')
                ->groupBy('department.department_id','department.department_name')->get(),
        ]);
    }
}


