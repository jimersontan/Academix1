<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentProfile;
use App\Models\FacultyProfile;

class ReportController extends Controller
{
    // Return a simple empty report placeholder for route:list and dev usage
    public function studentsByCourse(Request $request)
    {
        return response()->json([]);
    }

    public function facultyByDepartment(Request $request)
    {
        return response()->json([]);
    }
        // Search students or faculty by query. ?type=student|faculty&q=... returns list
        public function search(Request $request)
        {
            $type = $request->get('type', 'student');
            $q = $request->get('q', '');
            $departmentId = $request->integer('department_id');
            $courseId = $request->integer('course_id');

            if ($type === 'faculty') {
                $query = FacultyProfile::query()->whereNull('deleted_at');
                if (!empty($q)) {
                    $query->where(function($w) use ($q) {
                        $w->where('f_name', 'like', "%$q%")
                          ->orWhere('l_name', 'like', "%$q%")
                          ->orWhere('email_address', 'like', "%$q%");
                    });
                }
                if ($departmentId) {
                    $query->where('department_id', $departmentId);
                }
                $data = $query->with('department')->limit(200)->get();
                return response()->json(['data' => $data]);
            }

            // default: students
            $query = StudentProfile::query()->whereNull('archived_at');
            if (!empty($q)) {
                $query->where(function($w) use ($q) {
                    $w->where('f_name', 'like', "%$q%")
                      ->orWhere('l_name', 'like', "%$q%")
                      ->orWhere('email_address', 'like', "%$q%");
                });
            }
            if ($departmentId) {
                $query->where('department_id', $departmentId);
            }
            if ($courseId) {
                $query->where('course_id', $courseId);
            }
            $data = $query->with(['department', 'course'])->limit(200)->get();
            return response()->json(['data' => $data]);
        }

        // Return single person details by type and id: ?type=student|faculty&id=123
        public function person(Request $request)
        {
            $type = $request->get('type', 'student');
            $id = $request->integer('id');
            if (!$id) return response()->json(['data' => null]);

            if ($type === 'faculty') {
                $row = FacultyProfile::with('department')->where('faculty_id', $id)->whereNull('deleted_at')->first();
                return response()->json(['data' => $row]);
            }

            $row = StudentProfile::with(['department', 'course', 'academicYear'])->where('student_id', $id)->whereNull('archived_at')->first();
            return response()->json(['data' => $row]);
        }

}
    