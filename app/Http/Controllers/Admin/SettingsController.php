<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Department;
use App\Models\AcademicYear;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    // Courses
    public function listCourses() { return response()->json(Course::whereNull('archived_at')->get()); }
    public function createCourse(Request $r) { $d=$r->validate(['course_name'=>'required','department_id'=>'required|integer']); return response()->json(Course::create($d),201);}    
    public function updateCourse(Request $r,int $id){$c=Course::findOrFail($id);$c->update($r->all());return response()->json($c);}    
    public function archiveCourse(int $id){$c=Course::findOrFail($id);$c->archived_at=now();$c->save();return response()->json(['ok'=>true]);}

    // Departments
    public function listDepartments(){return response()->json(Department::whereNull('deleted_at')->get());}
    public function createDepartment(Request $r){$d=$r->validate(['department_name'=>'required']);return response()->json(Department::create($d),201);}    
    public function updateDepartment(Request $r,int $id){$dpt=Department::findOrFail($id);$dpt->update($r->all());return response()->json($dpt);}    
    public function archiveDepartment(int $id){$dpt=Department::findOrFail($id);$dpt->deleted_at=now();$dpt->save();return response()->json(['ok'=>true]);}

    // Academic Years
    public function listAcademicYears(){return response()->json(AcademicYear::whereNull('archived_at')->get());}
    public function createAcademicYear(Request $r){$d=$r->validate(['school_year'=>'required']);return response()->json(AcademicYear::create($d),201);}    
    public function updateAcademicYear(Request $r,int $id){$ay=AcademicYear::findOrFail($id);$ay->update($r->all());return response()->json($ay);}    
    public function archiveAcademicYear(int $id){$ay=AcademicYear::findOrFail($id);$ay->archived_at=now();$ay->save();return response()->json(['ok'=>true]);}
}


