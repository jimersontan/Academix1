<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FacultyProfile;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index(Request $request)
    {
        $query = FacultyProfile::query();
        if ($request->filled('department_id')) {
            $query->where('department_id', (int) $request->input('department_id'));
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
            $query->whereNotNull('deleted_at');
        } else {
            $query->whereNull('deleted_at');
        }
        return response()->json($query->with(['department'])->paginate(20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'f_name' => 'required|string',
            'm_name' => 'nullable|string',
            'l_name' => 'required|string',
            'suffix' => 'nullable|string',
            'date_of_birth' => 'nullable|string',
            'sex' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'email_address' => 'nullable|string',
            'address' => 'nullable|string',
            'position' => 'nullable|string',
            'department_id' => 'required|integer'
        ]);
        $faculty = FacultyProfile::create($data);
        return response()->json($faculty, 201);
    }

    public function update(Request $request, int $id)
    {
        $faculty = FacultyProfile::findOrFail($id);
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
            'position' => 'sometimes|nullable|string',
            'department_id' => 'sometimes|integer'
        ]);
        $faculty->update($data);
        return response()->json($faculty);
    }

    public function archive(int $id)
    {
        $faculty = FacultyProfile::findOrFail($id);
        $faculty->deleted_at = now();
        $faculty->save();
        return response()->json(['ok'=>true]);
    }

    public function restore(int $id)
    {
        $faculty = FacultyProfile::findOrFail($id);
        $faculty->deleted_at = null;
        $faculty->save();
        return response()->json(['ok'=>true]);
    }
}


