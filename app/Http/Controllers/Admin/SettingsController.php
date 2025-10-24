<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Department;
use App\Models\AcademicYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingsController extends Controller
{
    // Courses
    public function listCourses(Request $request) { 
        $query = Course::with('department');
        if ($request->filled('archived') && $request->get('archived') == '1') {
            $query->whereNotNull('archived_at');
        } else {
            $query->whereNull('archived_at');
        }
        return response()->json($query->get()); 
    }
    public function createCourse(Request $r) { 
        $d=$r->validate(['course_name'=>'required','department_id'=>'required|integer']); 
        return response()->json(Course::create($d),201);
    }    
    public function updateCourse(Request $r,int $id){
        $c=Course::findOrFail($id);
        $data = $r->validate(['course_name'=>'sometimes|string','department_id'=>'sometimes|integer']);
        $c->update($data);
        return response()->json($c);
    }    
    public function archiveCourse(int $id){
        $c=Course::findOrFail($id);
        $c->archived_at=now();
        $c->save();
        return response()->json(['ok'=>true]);
    }
    public function restoreCourse(int $id){
        $c=Course::findOrFail($id);
        $c->archived_at=null;
        $c->save();
        return response()->json(['ok'=>true]);
    }
    // permanent delete
    public function destroyCourse(int $id){
        $c=Course::findOrFail($id);
        try {
            $c->delete();
            return response()->json(['ok'=>true]);
        } catch (\Illuminate\Database\QueryException $ex) {
            // foreign key constraint or other DB-level issue
            return response()->json([
                'message' => 'Cannot delete: related records exist. Reassign or remove them first.'
            ], 409);
        }
    }

    // Departments
    public function listDepartments(Request $request){
        $query = Department::query();
        if ($request->filled('archived') && $request->get('archived') == '1') {
            $query->whereNotNull('deleted_at');
        } else {
            $query->whereNull('deleted_at');
        }
        return response()->json($query->get());
    }
    public function createDepartment(Request $r){
        $d=$r->validate(['department_name'=>'required']);
        return response()->json(Department::create($d),201);
    }    
    public function updateDepartment(Request $r,int $id){
        $dpt=Department::findOrFail($id);
        $data = $r->validate(['department_name'=>'sometimes|string']);
        $dpt->update($data);
        return response()->json($dpt);
    }    
    public function archiveDepartment(int $id){
        $dpt=Department::findOrFail($id);
        $dpt->deleted_at=now();
        $dpt->save();
        return response()->json(['ok'=>true]);
    }
    public function restoreDepartment(int $id){
        $dpt=Department::findOrFail($id);
        $dpt->deleted_at=null;
        $dpt->save();
        return response()->json(['ok'=>true]);
    }
    // permanent delete
    public function destroyDepartment(int $id){
        $dpt=Department::findOrFail($id);
        try {
            $dpt->delete();
            return response()->json(['ok'=>true]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json([
                'message' => 'Cannot delete: related records exist. Reassign or remove them first.'
            ], 409);
        }
    }

    // Academic Years
    public function listAcademicYears(Request $request){
        $query = AcademicYear::query();
        if ($request->filled('archived') && $request->get('archived') == '1') {
            $query->whereNotNull('archived_at');
        } else {
            $query->whereNull('archived_at');
        }
        return response()->json($query->get());
    }
    public function createAcademicYear(Request $r){
        $d=$r->validate(['school_year'=>'required']);
        return response()->json(AcademicYear::create($d),201);
    }    
    public function updateAcademicYear(Request $r,int $id){
        $ay=AcademicYear::findOrFail($id);
        $data = $r->validate(['school_year'=>'sometimes|string']);
        $ay->update($data);
        return response()->json($ay);
    }    
    public function archiveAcademicYear(int $id){
        $ay=AcademicYear::findOrFail($id);
        $ay->archived_at=now();
        $ay->save();
        return response()->json(['ok'=>true]);
    }
    public function restoreAcademicYear(int $id){
        $ay=AcademicYear::findOrFail($id);
        $ay->archived_at=null;
        $ay->save();
        return response()->json(['ok'=>true]);
    }
    // permanent delete
    public function destroyAcademicYear(int $id){
        $ay=AcademicYear::findOrFail($id);
        try {
            $ay->delete();
            return response()->json(['ok'=>true]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json([
                'message' => 'Cannot delete: related records exist. Reassign or remove them first.'
            ], 409);
        }
    }

    // return counts of related records to show in UI before delete
    public function countRelated(Request $request, $type, $id) {
        // only allow the three supported types
        $allowed = ['courses', 'departments', 'academic-years'];
        if (!in_array($type, $allowed)) return response()->json(['message'=>'Invalid type'], 400);

        // map to column name
        $col = $type === 'courses' ? 'course_id' : ($type === 'departments' ? 'department_id' : 'academic_year_id');

        $count = DB::table('student_profile')->where($col, $id)->count();

        return response()->json(['related_students' => $count]);
    }
}


