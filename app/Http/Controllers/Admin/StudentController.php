<?php

namespace App\Http\Controllers\Api;

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
        return response()->json($query->whereNull('archived_at')->paginate(20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'f_name'=>'required','l_name'=>'required','department_id'=>'required|integer','course_id'=>'required|integer','academic_year_id'=>'required|integer'
        ]);
        $student = StudentProfile::create($data);
        return response()->json($student, 201);
    }

    public function update(Request $request, int $id)
    {
        $student = StudentProfile::findOrFail($id);
        $student->update($request->all());
        return response()->json($student);
    }

    public function archive(int $id)
    {
        $student = StudentProfile::findOrFail($id);
        $student->archived_at = now();
        $student->save();
        return response()->json(['ok'=>true]);
    }
}


