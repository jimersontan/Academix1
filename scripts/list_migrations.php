<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$rows = Illuminate\Support\Facades\DB::table('migrations')->orderBy('id')->get();
foreach ($rows as $r) {
    echo $r->id . ' => ' . $r->migration . "\n";
}
