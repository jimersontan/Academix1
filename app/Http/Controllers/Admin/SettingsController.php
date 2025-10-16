<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Department;
use App\Models\AcademicYear;
use Illuminate\Http\Request;

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
}


