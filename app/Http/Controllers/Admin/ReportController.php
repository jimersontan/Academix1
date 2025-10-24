<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudentProfile;
use App\Models\FacultyProfile;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function studentsByCourse(Request $request)
    {
        $courseId = $request->input('course_id') !== null ? (int)$request->input('course_id') : null;
        $query = StudentProfile::query()->whereNull('archived_at');
        if ($courseId) $query->where('course_id', $courseId);
        $data = $query->get();
        return response()->json(['data' => $data]);
    }

    public function facultyByDepartment(Request $request)
    {
        $deptId = $request->input('department_id') !== null ? (int)$request->input('department_id') : null;
        $query = FacultyProfile::query()->whereNull('deleted_at');
        if ($deptId) $query->where('department_id', $deptId);
        $data = $query->get();
        return response()->json(['data' => $data]);
    }
}


