<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentProfile;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = StudentProfile::query();
        if ($request->filled('department_id')) {
            $query->where('department_id', $request->integer('department_id'));
        }
        if ($request->filled('course_id')) {
            $query->where('course_id', $request->integer('course_id'));
        }
        if ($request->filled('q')) {
            $q = $request->get('q');
            $query->where(function($w) use ($q) {
                $w->where('f_name','like',"%$q%")
                  ->orWhere('l_name','like',"%$q%")
                  ->orWhere('email_address','like',"%$q%");
            });
        }
        // Show archived or active based on parameter
        if ($request->filled('archived') && $request->get('archived') == '1') {
            $query->whereNotNull('archived_at');
        } else {
            $query->whereNull('archived_at');
        }
        return response()->json($query->with(['department', 'course', 'academicYear'])->paginate(20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'f_name' => 'required|string',
            'm_name' => 'nullable|string',
            'l_name' => 'required|string',
            'suffix' => 'nullable|string',
            // Be lenient on formats provided by various browsers/inputs
            'date_of_birth' => 'nullable|string',
            'sex' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'email_address' => 'nullable|string',
            'address' => 'nullable|string',
            'status' => 'nullable|string',
            'department_id' => 'required|integer',
            'course_id' => 'required|integer',
            'academic_year_id' => 'required|integer',
            'year_level' => 'nullable|string'
        ]);
        if (empty($data['year_level'])) { $data['year_level'] = '1st'; }
        $student = StudentProfile::create($data);
        return response()->json($student, 201);
    }

    public function update(Request $request, int $id)
    {
        $student = StudentProfile::findOrFail($id);
        $data = $request->validate([
            'f_name' => 'sometimes|string',
            'm_name' => 'sometimes|nullable|string',
            'l_name' => 'sometimes|string',
            'suffix' => 'sometimes|nullable|string',
            'date_of_birth' => 'sometimes|nullable|string',
            'sex' => 'sometimes|nullable|string',
            'phone_number' => 'sometimes|nullable|string',
            'email_address' => 'sometimes|nullable|string',
            'address' => 'sometimes|nullable|string',
            'status' => 'sometimes|nullable|string',
            'department_id' => 'sometimes|integer',
            'course_id' => 'sometimes|integer',
            'academic_year_id' => 'sometimes|integer',
            'year_level' => 'sometimes|nullable|string'
        ]);
        if (array_key_exists('year_level', $data) && empty($data['year_level'])) { $data['year_level'] = '1st'; }
        $student->update($data);
        return response()->json($student);
    }

    public function archive(int $id)
    {
        $student = StudentProfile::findOrFail($id);
        $student->archived_at = now();
        $student->save();
        return response()->json(['ok'=>true]);
    }

    public function restore(int $id)
    {
        $student = StudentProfile::findOrFail($id);
        $student->archived_at = null;
        $student->save();
        return response()->json(['ok'=>true]);
    }
}


