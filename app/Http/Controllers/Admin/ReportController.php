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
        $courseId = $request->integer('course_id');
        $data = StudentProfile::where('course_id', $courseId)->whereNull('archived_at')->get();
        return response()->json(['data' => $data]);
    }

    public function facultyByDepartment(Request $request)
    {
        $deptId = $request->integer('department_id');
        $data = FacultyProfile::where('department_id', $deptId)->whereNull('deleted_at')->get();
        return response()->json(['data' => $data]);
    }
}


