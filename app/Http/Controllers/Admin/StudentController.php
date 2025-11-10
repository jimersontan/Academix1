<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = StudentProfile::query();
        if ($request->filled('department_id')) {
            $query->where('department_id', (int) $request->input('department_id'));
        }
        if ($request->filled('course_id')) {
            $query->where('course_id', (int) $request->input('course_id'));
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
            'phone_number' => 'required|digits:11',
            'email_address' => 'nullable|string',
            'address' => 'nullable|string',
            'status' => 'nullable|string',
            'department_id' => 'required|integer',
            'course_id' => 'required|integer',
            'academic_year_id' => 'required|integer',
            'year_level' => 'nullable|string'
        ]);
        if (empty($data['year_level'])) { $data['year_level'] = '1st'; }
        // Compute next display id inside a transaction but only include it in the
        // insert payload if the DB column actually exists. This prevents SQL errors
        // when the migration hasn't been applied.
        $nextDisplay = DB::transaction(function () {
            $base = 2310000;
            // If the column exists use it to compute next, otherwise fall back to PK logic
            if (Schema::hasColumn('student_profile', 'display_id')) {
                $maxDisplay = DB::table('student_profile')->lockForUpdate()->max('display_id');
                if ($maxDisplay && (int)$maxDisplay > 0) return (int)$maxDisplay + 1;
            }
            // Fallback to existing primary keys
            $maxPk = DB::table('student_profile')->max('student_id');
            $maxPk = $maxPk ? (int)$maxPk : 0;
            if ($maxPk >= $base) return $maxPk + 1;
            return $base + $maxPk + 1;
        });

        if (Schema::hasColumn('student_profile', 'display_id')) {
            $data['display_id'] = $nextDisplay;
        }

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
            'phone_number' => 'sometimes|required|digits:11',
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

    /**
     * Return the next available display student id (2310000 + max(pk) + 1)
     */
    public function nextId()
    {
        $baseOffset = 2310000;
        // If the new column isn't present yet, avoid querying it (prevents SQL errors)
        $next = DB::transaction(function () use ($baseOffset) {
            if (Schema::hasColumn('student_profile', 'display_id')) {
                $maxDisplay = DB::table('student_profile')->lockForUpdate()->max('display_id');
                if ($maxDisplay && (int)$maxDisplay > 0) return (int)$maxDisplay + 1;
            }
            $maxPk = DB::table('student_profile')->max('student_id');
            $maxPk = $maxPk ? (int) $maxPk : 0;
            if ($maxPk >= $baseOffset) return $maxPk + 1;
            return $baseOffset + $maxPk + 1;
        });
        return response()->json(['next_id' => $next]);
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

    /**
     * Permanently delete a student record (irreversible)
     */
    public function destroy(int $id)
    {
        $student = StudentProfile::find($id);
        if (!$student) {
            return response()->json(['ok' => false, 'message' => 'Student not found'], 404);
        }
        $student->delete();
        return response()->json(['ok' => true]);
    }
}


