<?php
// Quick integration script to archive one student and one faculty, then print dashboard stats.
// Run from project root: php scripts/integration_test_archive.php

require __DIR__ . '/../vendor/autoload.php';

// Boot Laravel application
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\StudentProfile;
use App\Models\FacultyProfile;
use Illuminate\Support\Facades\DB;

try {
    echo "Starting integration test...\n";

    // Find an active student (not archived)
    $student = StudentProfile::whereNull('archived_at')->where('status','active')->first();
    if ($student) {
        echo "Archiving student id={$student->student_id}...\n";
        $student->archived_at = now();
        $student->status = 'inactive';
        $student->save();
        echo "Student archived_at={$student->archived_at}, status={$student->status}\n";
    } else {
        echo "No active student found to archive.\n";
    }

    // Find a faculty not deleted
    $faculty = FacultyProfile::whereNull('deleted_at')->first();
    if ($faculty) {
        echo "Archiving faculty id={$faculty->faculty_id}...\n";
        $faculty->deleted_at = now();
        $faculty->save();
        echo "Faculty deleted_at={$faculty->deleted_at}\n";
    } else {
        echo "No non-deleted faculty found to archive.\n";
    }

    // Print dashboard stats via controller logic
    $stats = (new App\Http\Controllers\Admin\DashboardController())->stats();
    echo "\nDashboard stats (controller response):\n";
    print_r($stats->getData(true));

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}

echo "Integration test finished.\n";
