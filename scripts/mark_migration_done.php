<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
$missing = '2025_10_23_000100_add_status_to_faculty_profile';
$exists = DB::table('migrations')->where('migration', $missing)->exists();
if ($exists) {
    echo "Migration already recorded: $missing\n";
    exit(0);
}
$maxBatch = DB::table('migrations')->max('batch') ?: 0;
DB::table('migrations')->insert([
    'migration' => $missing,
    'batch' => $maxBatch + 1,
]);
echo "Inserted migration record: $missing (batch=" . ($maxBatch+1) . ")\n";
