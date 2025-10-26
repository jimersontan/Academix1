<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentProfile;
use App\Models\FacultyProfile;
use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // Get all students with optional course filter
    public function getStudents(Request $request)
    {
        $query = StudentProfile::with(['course', 'department', 'academicYear'])
            ->whereNull('archived_at');
        
        // Filter by course if provided
        if ($request->filled('course_id')) {
            $query->where('course_id', (int) $request->input('course_id'));
        }
        
        $data = $query->get();
        return response()->json($data);
    }

    // Get all faculty with optional department filter
    public function getFaculty(Request $request)
    {
        $query = FacultyProfile::with('department')
            ->whereNull('deleted_at');
        
        // Filter by department if provided
        if ($request->filled('department_id')) {
            $query->where('department_id', (int) $request->input('department_id'));
        }
        
        $data = $query->get();
        return response()->json($data);
    }

    // Get all active courses for dropdown
    public function getCourses()
    {
        $courses = Course::with('department')
            ->whereNull('archived_at')
            ->orderBy('course_name')
            ->get();
        return response()->json($courses);
    }

    // Get all active departments for dropdown
    public function getDepartments()
    {
        $departments = Department::whereNull('deleted_at')
            ->orderBy('department_name')
            ->get();
        return response()->json($departments);
    }

    // Legacy methods (kept for backward compatibility)
    public function studentsByCourse(Request $request)
    {
        $courseId = (int) $request->input('course_id');
        $data = StudentProfile::where('course_id', $courseId)->whereNull('archived_at')->get();
        return response()->json(['data' => $data]);
    }

    public function facultyByDepartment(Request $request)
    {
        $deptId = (int) $request->input('department_id');
        $data = FacultyProfile::where('department_id', $deptId)->whereNull('deleted_at')->get();
        return response()->json(['data' => $data]);
    }
}


