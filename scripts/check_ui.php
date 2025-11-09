<?php
// Quick check script: bootstraps Laravel and calls controllers directly (bypasses HTTP/auth)
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\DashboardController;

try {
    $sCtrl = new StudentController();
    $dCtrl = new DashboardController();

    $req = Request::create('/api/students', 'GET', ['page' => 1]);
    $sResp = $sCtrl->index($req);
    $sJson = json_decode($sResp->getContent(), true);

    $req2 = Request::create('/api/dashboard/stats', 'GET');
    $dResp = $dCtrl->stats($req2);
    $dJson = json_decode($dResp->getContent(), true);

    echo "STUDENTS SUMMARY:\n";
    $total = $sJson['total'] ?? (is_array($sJson['data']) ? count($sJson['data']) : 0);
    echo "- total (from paginator): " . $total . "\n";
    echo "- sample rows (up to 3):\n";
    $sample = array_slice($sJson['data'] ?? [], 0, 3);
    foreach ($sample as $r) {
        echo "  - [${r['student_id']}] " . ($r['display_id'] ?? ($r['student_id'] + 2310000)) . " - " . ($r['f_name'] ?? '') . " " . ($r['l_name'] ?? '') . "\n";
    }

    echo "\nCHARTS SUMMARY:\n";
    $spc = $dJson['students_per_course'] ?? [];
    $fpd = $dJson['faculty_per_department'] ?? [];
    echo "- students_per_course rows: " . (is_array($spc) ? count($spc) : 0) . "\n";
    echo "- faculty_per_department rows: " . (is_array($fpd) ? count($fpd) : 0) . "\n";

    // Print small sample
    if (is_array($spc) && count($spc)) {
        echo "\nStudents per course sample:\n";
        foreach (array_slice($spc,0,5) as $r) echo "  - {$r['course_name']} => {$r['total']}\n";
    }
    if (is_array($fpd) && count($fpd)) {
        echo "\nFaculty per department sample:\n";
        foreach (array_slice($fpd,0,5) as $r) echo "  - {$r['department_name']} => {$r['total']}\n";
    }

} catch (\Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
