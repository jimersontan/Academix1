<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Department;
use App\Models\AcademicYear;
use App\Models\StudentProfile;
use App\Models\FacultyProfile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
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
        // Archive department and cascade to courses, students and faculty.
        DB::transaction(function() use ($id) {
            $dpt = Department::findOrFail($id);
            $ts = now();
            // mark department deleted
            $dpt->deleted_at = $ts;
            $dpt->save();

            // Archive courses belonging to this department (only if not already archived)
            Course::where('department_id', $id)
                ->whereNull('archived_at')
                ->update(['archived_at' => $ts]);

            // Mark students INACTIVE (do NOT move them to archived list). Record dept_inactive_at when available
            $studentUpdates = ['status' => 'inactive'];
            if (Schema::hasColumn('student_profile', 'dept_inactive_at')) {
                $studentUpdates['dept_inactive_at'] = $ts;
            }
            StudentProfile::where('department_id', $id)
                ->update($studentUpdates);

            $courseIds = Course::where('department_id', $id)->pluck('course_id')->toArray();
            if (!empty($courseIds)) {
                StudentProfile::whereIn('course_id', $courseIds)
                    ->update($studentUpdates);
            }

            // Mark faculty INACTIVE (do NOT soft-delete) where supported. If the columns are not present,
            // skip updating faculty to avoid SQL errors — prompt migration instead.
            $facultyUpdates = [];
            if (Schema::hasColumn('faculty_profile', 'status')) {
                $facultyUpdates['status'] = 'inactive';
            }
            if (Schema::hasColumn('faculty_profile', 'dept_inactive_at')) {
                $facultyUpdates['dept_inactive_at'] = $ts;
            }
            if (!empty($facultyUpdates)) {
                FacultyProfile::where('department_id', $id)->update($facultyUpdates);
            }
        });
        return response()->json(['ok'=>true]);
    }
    public function restoreDepartment(int $id){
        // Restore department and reverse cascade only for items archived by the department
        DB::transaction(function() use ($id) {
            $dpt = Department::findOrFail($id);
            $ts = $dpt->deleted_at;
            // clear department deleted flag
            $dpt->deleted_at = null;
            $dpt->save();

            if ($ts) {
                // Only unarchive courses that were archived with the same timestamp
                Course::where('department_id', $id)
                    ->where('archived_at', $ts)
                    ->update(['archived_at' => null]);

                // Only restore students that were inactivated by this department archive (if the tracking column exists)
                if (Schema::hasColumn('student_profile', 'dept_inactive_at')) {
                    StudentProfile::where('department_id', $id)
                        ->where('dept_inactive_at', $ts)
                        ->update(['status' => 'active', 'dept_inactive_at' => null]);

                    $courseIds = Course::where('department_id', $id)->pluck('course_id')->toArray();
                    if (!empty($courseIds)) {
                        StudentProfile::whereIn('course_id', $courseIds)
                            ->where('dept_inactive_at', $ts)
                            ->update(['status' => 'active', 'dept_inactive_at' => null]);
                    }
                }

                // Only restore faculty that were marked inactive by this department archive (if columns exist)
                if (Schema::hasColumn('faculty_profile', 'dept_inactive_at') || Schema::hasColumn('faculty_profile', 'status')) {
                    $facultyWhere = FacultyProfile::where('department_id', $id);
                    if (Schema::hasColumn('faculty_profile', 'dept_inactive_at')) {
                        $facultyWhere->where('dept_inactive_at', $ts);
                        $facultyWhere->update(['status' => (Schema::hasColumn('faculty_profile', 'status') ? 'active' : null), 'dept_inactive_at' => null]);
                    } elseif (Schema::hasColumn('faculty_profile', 'status')) {
                        $facultyWhere->update(['status' => 'active']);
                    }
                }
            }
        });
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
        // Archive academic year and mark enrolled students inactive (do not move them to archived list)
        DB::transaction(function() use ($id) {
            $ay = AcademicYear::findOrFail($id);
            $ts = now();
            $ay->archived_at = $ts;
            $ay->save();

            // Mark students in this academic year as inactive (only non-archived students)
            StudentProfile::where('academic_year_id', $id)
                ->whereNull('archived_at')
                ->update(['status' => 'inactive']);
        });
        return response()->json(['ok'=>true]);
    }
    public function restoreAcademicYear(int $id){
        // Restore academic year and reactivate enrolled students
        DB::transaction(function() use ($id) {
            $ay = AcademicYear::findOrFail($id);
            $ay->archived_at = null;
            $ay->save();

            // Reactivate students that belong to this academic year
            StudentProfile::where('academic_year_id', $id)
                ->update(['status' => 'active']);
        });
        return response()->json(['ok'=>true]);
    }
}


