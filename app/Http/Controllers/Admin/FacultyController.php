<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FacultyProfile;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index(Request $request)
    {
        $query = FacultyProfile::query();
        if ($request->filled('department_id')) {
            $query->where('department_id', $request->integer('department_id'));
        }
        if ($request->filled('q')) {
            $q = $request->get('q');
            $query->where(function($w) use ($q) {
                $w->where('f_name','like',"%$q%")
                  ->orWhere('l_name','like',"%$q%")
                  ->orWhere('email_address','like',"%$q%");
            });
        }
        return response()->json($query->whereNull('deleted_at')->paginate(20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'f_name'=>'required','l_name'=>'required','department_id'=>'required|integer','email_address'=>'nullable|email'
        ]);
        $faculty = FacultyProfile::create($data);
        return response()->json($faculty, 201);
    }

    public function update(Request $request, int $id)
    {
        $faculty = FacultyProfile::findOrFail($id);
        $faculty->update($request->all());
        return response()->json($faculty);
    }

    public function archive(int $id)
    {
        $faculty = FacultyProfile::findOrFail($id);
        $faculty->deleted_at = now();
        $faculty->save();
        return response()->json(['ok'=>true]);
    }
}


