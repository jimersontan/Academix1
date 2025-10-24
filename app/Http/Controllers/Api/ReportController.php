<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentProfile;
use App\Models\FacultyProfile;
use App\Models\Department;
use App\Models\Course;
use App\Models\AcademicYear;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    // Return a simple empty report placeholder for route:list and dev usage
    public function studentsByCourse(Request $request)
    {
        return response()->json([]);
    }

    public function facultyByDepartment(Request $request)
    {
        return response()->json([]);
    }
        // Search students or faculty by query. ?type=student|faculty&q=... returns list
        public function search(Request $request)
        {
            $type = $request->get('type', 'student');
            $q = $request->get('q', '');
            $departmentId = $request->input('department_id') !== null ? (int)$request->input('department_id') : null;
            $courseId = $request->input('course_id') !== null ? (int)$request->input('course_id') : null;

            if ($type === 'faculty') {
                $query = FacultyProfile::query()->whereNull('deleted_at');
                if (!empty($q)) {
                    $query->where(function($w) use ($q) {
                        $w->where('f_name', 'like', "%$q%")
                          ->orWhere('l_name', 'like', "%$q%")
                          ->orWhere('email_address', 'like', "%$q%");
                    });
                }
                if ($departmentId) {
                    $query->where('department_id', $departmentId);
                }
                $data = $query->with('department')->limit(200)->get();
                return response()->json(['data' => $data]);
            }

            // default: students
            $query = StudentProfile::query()->whereNull('archived_at');
            if (!empty($q)) {
                $query->where(function($w) use ($q) {
                    $w->where('f_name', 'like', "%$q%")
                      ->orWhere('l_name', 'like', "%$q%")
                      ->orWhere('email_address', 'like', "%$q%");
                });
            }
            if ($departmentId) {
                $query->where('department_id', $departmentId);
            }
            if ($courseId) {
                $query->where('course_id', $courseId);
            }
            $data = $query->with(['department', 'course', 'academicYear'])->limit(200)->get();
            return response()->json(['data' => $data]);
        }

        // Return single person details by type and id: ?type=student|faculty&id=123
        public function person(Request $request)
        {
            $type = $request->get('type', 'student');
            $id = $request->input('id') !== null ? (int)$request->input('id') : null;
            if (!$id) return response()->json(['data' => null]);

            if ($type === 'faculty') {
                $row = FacultyProfile::with('department')->where('faculty_id', $id)->whereNull('deleted_at')->first();
                return response()->json(['data' => $row]);
            }

            $row = StudentProfile::with(['department', 'course', 'academicYear'])->where('student_id', $id)->whereNull('archived_at')->first();
            return response()->json(['data' => $row]);
        }

        // Import CSV file (form-data: file, type=student|faculty)
        public function import(Request $request)
        {
            $type = $request->get('type', 'student');
            if (!$request->hasFile('file')) {
                return response()->json(['success' => false, 'message' => 'No file uploaded'], 400);
            }

            

            $file = $request->file('file');
            if (!$file->isValid()) {
                return response()->json(['success' => false, 'message' => 'Uploaded file is not valid'], 400);
            }

            $path = $file->getRealPath();
            $handle = fopen($path, 'r');
            if ($handle === false) {
                return response()->json(['success' => false, 'message' => 'Could not open uploaded file'], 500);
            }

            // Read header
            $header = fgetcsv($handle);
            if (!$header) {
                fclose($handle);
                return response()->json(['success' => false, 'message' => 'CSV has no header row'], 400);
            }

            $map = [];
            foreach ($header as $i => $h) {
                $key = strtolower(trim($h));
                $key = preg_replace('/[^a-z0-9_ ]+/', '', $key);
                $key = str_replace(' ', '_', $key);
                $map[$i] = $key;
            }

            $summary = ['created' => 0, 'updated' => 0, 'errors' => 0, 'rows' => 0];
            DB::beginTransaction();
            try {
                while (($row = fgetcsv($handle)) !== false) {
                    $summary['rows']++;
                    $data = [];
                    foreach ($row as $i => $val) {
                        $k = $map[$i] ?? null;
                        if (!$k) continue;
                        $data[$k] = trim($val);
                    }

                    try {
                        if ($type === 'faculty') {
                            // Map common fields
                            $email = $data['email'] ?? $data['email_address'] ?? null;
                            $first = $data['first_name'] ?? $data['f_name'] ?? null;
                            $last = $data['last_name'] ?? $data['l_name'] ?? null;
                            $position = $data['position'] ?? null;
                            $deptName = $data['department'] ?? $data['department_name'] ?? null;

                            // resolve department
                            $department_id = null;
                            if ($deptName) {
                                $department = Department::firstOrCreate(['department_name' => $deptName]);
                                $department_id = $department->department_id;
                            }

                            // find existing by email when possible
                            $existing = null;
                            if ($email) $existing = FacultyProfile::where('email_address', $email)->first();

                            $payload = [
                                'f_name' => $first,
                                'l_name' => $last,
                                'email_address' => $email,
                                'position' => $position,
                                'department_id' => $department_id,
                            ];

                            if ($existing) {
                                $existing->fill(array_filter($payload));
                                $existing->save();
                                $summary['updated']++;
                            } else {
                                FacultyProfile::create(array_filter($payload));
                                $summary['created']++;
                            }
                        } else {
                            // students
                            $email = $data['email'] ?? $data['email_address'] ?? null;
                            $first = $data['first_name'] ?? $data['f_name'] ?? null;
                            $last = $data['last_name'] ?? $data['l_name'] ?? null;
                            $courseName = $data['course'] ?? $data['course_name'] ?? null;
                            $deptName = $data['department'] ?? $data['department_name'] ?? null;
                            $yearLevel = $data['year_level'] ?? $data['year'] ?? null;
                            $ay = $data['academic_year'] ?? $data['school_year'] ?? null;

                            $department_id = null;
                            if ($deptName) {
                                $department = Department::firstOrCreate(['department_name' => $deptName]);
                                $department_id = $department->department_id;
                            }

                            $course_id = null;
                            if ($courseName) {
                                $course = Course::firstOrCreate(['course_name' => $courseName], ['department_id' => $department_id]);
                                $course_id = $course->course_id;
                            }

                            $academic_year_id = null;
                            if ($ay) {
                                $academic = AcademicYear::firstOrCreate(['school_year' => $ay]);
                                $academic_year_id = $academic->academic_year_id;
                            }

                            $existing = null;
                            if ($email) $existing = StudentProfile::where('email_address', $email)->first();

                            $payload = [
                                'f_name' => $first,
                                'l_name' => $last,
                                'email_address' => $email,
                                'department_id' => $department_id,
                                'course_id' => $course_id,
                                'academic_year_id' => $academic_year_id,
                                'year_level' => $yearLevel,
                            ];

                            if ($existing) {
                                $existing->fill(array_filter($payload));
                                $existing->save();
                                $summary['updated']++;
                            } else {
                                StudentProfile::create(array_filter($payload));
                                $summary['created']++;
                            }
                        }
                    } catch (\Exception $e) {
                        // log and continue
                        \Log::error('Import row failed: ' . $e->getMessage());
                        $summary['errors']++;
                    }

                }

                DB::commit();
                fclose($handle);
                return response()->json(['success' => true, 'summary' => $summary]);
            } catch (\Exception $e) {
                DB::rollBack();
                fclose($handle);
                \Log::error('Import failed: ' . $e->getMessage());
                return response()->json(['success' => false, 'message' => 'Import failed: '.$e->getMessage()], 500);
            }
        }

        /**
         * Debug helper: return a small sample payload for UI testing.
         * Only available when app is in local environment or debug mode.
         */
        public function debugSample(Request $request)
        {
            if (!app()->environment('local') && !config('app.debug')) {
                return response()->json(['message' => 'Not available'], 404);
            }

            $students = [
                [
                    'student_id' => 1001,
                    'f_name' => 'Alice', 'l_name' => 'Santos', 'email_address' => 'alice.santos@example.com',
                    'course' => ['course_id'=>1,'course_name'=>'BS Computer Science'],
                    'department' => ['department_id'=>1,'department_name'=>'Computer Science'],
                    'academicYear' => ['academic_year_id'=>1,'year'=>'2024-2025'],
                    'year_level' => '2'
                ],
                [
                    'student_id' => 1002,
                    'f_name' => 'Ben', 'l_name' => 'Garcia', 'email_address' => 'ben.garcia@example.com',
                    'course' => ['course_id'=>2,'course_name'=>'BS Information Technology'],
                    'department' => ['department_id'=>2,'department_name'=>'Information Technology'],
                    'academicYear' => ['academic_year_id'=>1,'year'=>'2024-2025'],
                    'year_level' => '3'
                ]
            ];

            $faculty = [
                [
                    'faculty_id' => 2001,
                    'f_name' => 'Dr. Clara', 'l_name' => 'Reyes', 'email_address' => 'clara.reyes@example.com',
                    'position' => 'Professor',
                    'department' => ['department_id'=>1,'department_name'=>'Computer Science']
                ],
                [
                    'faculty_id' => 2002,
                    'f_name' => 'Engr. Daniel', 'l_name' => 'Lopez', 'email_address' => 'daniel.lopez@example.com',
                    'position' => 'Lecturer',
                    'department' => ['department_id'=>2,'department_name'=>'Information Technology']
                ]
            ];

            return response()->json(['data' => ['students' => $students, 'faculty' => $faculty]]);
        }

}
    