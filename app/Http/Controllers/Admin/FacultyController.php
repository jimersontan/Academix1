<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FacultyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

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
            'phone_number' => 'required|digits:11',
            'email_address' => 'nullable|string',
            'address' => 'nullable|string',
            'position' => 'nullable|string',
            'department_id' => 'required|integer'
        ]);
        // Generate and assign a stored display_id atomically where supported
        $data['display_id'] = DB::transaction(function () {
            $base = 2510000;
            // Only try reading display_id if the column exists (migration may not have run yet)
            if (Schema::hasColumn('faculty_profile', 'display_id')) {
                $maxDisplay = DB::table('faculty_profile')->lockForUpdate()->max('display_id');
                if ($maxDisplay && (int)$maxDisplay > 0) return (int)$maxDisplay + 1;
            }
            // Fallback to existing primary keys
            $maxPk = DB::table('faculty_profile')->max('faculty_id');
            $maxPk = $maxPk ? (int)$maxPk : 0;
            if ($maxPk >= $base) return $maxPk + 1;
            return $base + $maxPk + 1;
        });

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
            'phone_number' => 'sometimes|required|digits:11',
            'email_address' => 'sometimes|nullable|string',
            'address' => 'sometimes|nullable|string',
            'position' => 'sometimes|nullable|string',
            'department_id' => 'sometimes|integer'
        ]);
        $faculty->update($data);
        return response()->json($faculty);
    }

    /**
     * Return the next available display faculty id (2510000 + max(pk) + 1)
     */
    public function nextId()
    {
        $baseOffset = 2510000;
        // If the new column isn't present yet, avoid querying it (prevents SQL errors)
        $next = DB::transaction(function () use ($baseOffset) {
            if (Schema::hasColumn('faculty_profile', 'display_id')) {
                $maxDisplay = DB::table('faculty_profile')->lockForUpdate()->max('display_id');
                if ($maxDisplay && (int)$maxDisplay > 0) return (int)$maxDisplay + 1;
            }
            // Fallback to primary key logic
            $maxPk = DB::table('faculty_profile')->max('faculty_id');
            $maxPk = $maxPk ? (int) $maxPk : 0;
            if ($maxPk >= $baseOffset) return $maxPk + 1;
            return $baseOffset + $maxPk + 1;
        });
        return response()->json(['next_id' => $next]);
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

    /**
     * Permanently delete a faculty record (irreversible)
     */
    public function destroy(int $id)
    {
        $faculty = FacultyProfile::find($id);
        if (!$faculty) {
            return response()->json(['ok' => false, 'message' => 'Faculty not found'], 404);
        }
        // Permanently remove record from DB
        $faculty->delete();
        return response()->json(['ok' => true]);
    }
}


